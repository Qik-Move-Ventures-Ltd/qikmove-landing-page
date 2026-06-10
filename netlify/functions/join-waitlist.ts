import type { Handler, HandlerEvent } from '@netlify/functions';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

dotenvConfig({ path: resolve(process.cwd(), '.env') });

async function getDb() {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not set');
    const client = new MongoClient(uri);
    await client.connect();
    return { db: client.db(process.env.MONGODB_DB_NAME ?? 'qikmove'), client };
}

function welcomeHtml(email: string) {
    return `
<!doctype html>
<html><body style="margin:0;padding:0;background:#0a0a0a;font-family:Inter,Arial,sans-serif;color:#e6e6e6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:linear-gradient(180deg,#0f0f12,#0a0a0a);border:1px solid #1f1f23;border-radius:20px;overflow:hidden;">
        <tr><td style="padding:32px 32px 8px;">
          <div style="display:inline-block;padding:6px 12px;border:1px solid #2a2a30;border-radius:999px;font-size:12px;color:#9aff5a;letter-spacing:.04em;">YOU'RE ON THE LIST</div>
          <h1 style="font-size:32px;line-height:1.15;margin:18px 0 8px;color:#fff;font-weight:800;">Welcome to QikMove 🚀</h1>
          <p style="font-size:15px;line-height:1.6;color:#b5b5be;margin:0 0 20px;">No cap — you just secured early access to the fastest way to move parcels across Nigeria.</p>
        </td></tr>
        <tr><td style="padding:8px 32px 16px;">
          <h2 style="font-size:18px;color:#fff;margin:16px 0 8px;">What is QikMove?</h2>
          <p style="font-size:14px;line-height:1.7;color:#b5b5be;margin:0 0 14px;">QikMove is a logistics &amp; delivery platform connecting customers and riders directly. Post a dispatch, see nearby riders, negotiate a fair price, and watch your parcel move — all from your phone.</p>
          <h2 style="font-size:18px;color:#fff;margin:20px 0 8px;">Your early-user perks 🎁</h2>
          <ul style="font-size:14px;line-height:1.8;color:#b5b5be;padding-left:18px;margin:0 0 18px;">
            <li><b style="color:#fff;">First in line</b> — get the app the moment it drops.</li>
            <li><b style="color:#fff;">Zero service fees</b> on your first 5 dispatches.</li>
            <li><b style="color:#fff;">Founding member badge</b> on your profile.</li>
            <li><b style="color:#fff;">Direct line</b> to the team — your feedback shapes v1.</li>
          </ul>
        </td></tr>
        <tr><td style="padding:8px 32px 32px;">
          <div style="padding:16px;background:#111116;border:1px solid #1f1f23;border-radius:14px;">
            <p style="margin:0;font-size:13px;color:#9aff5a;font-weight:600;">📍 Move it. Like it. Mean it</p>
            <p style="margin:6px 0 0;font-size:13px;color:#8a8a92;">We'll hit you up the second we launch. Stay tuned.</p>
          </div>
          <p style="margin:24px 0 0;font-size:12px;color:#6a6a72;">You're receiving this because <b style="color:#9a9aa2;">${email}</b> joined the QikMove waitlist.</p>
          <p style="margin:6px 0 0;font-size:12px;color:#6a6a72;">QikMove — Nigeria</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sendWelcomeEmail(email: string) {
    const smtpUser = process.env.SMTP_USER ?? '';
    const smtpPassword = process.env.SMTP_PASSWORD ?? '';
    const fromEmail = process.env.SMTP_FROM_EMAIL ?? '';
    const fromName = process.env.SMTP_FROM_NAME ?? 'QikMove';
    const smtpHost = process.env.SMTP_HOST ?? 'smtp-relay.brevo.com';
    const smtpPort = Number(process.env.SMTP_PORT ?? '587');

    if (!smtpUser || !smtpPassword) {
        throw new Error('SMTP credentials not configured (SMTP_USER / SMTP_PASSWORD)');
    }

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPassword },
    });

    await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: "You're in 🚀 Welcome to QikMove",
        text: "Welcome to QikMove! You're on the early-access list. We'll hit you up the moment we launch.",
        html: welcomeHtml(email),
    });
}

function isValidEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 255;
}

export const handler: Handler = async (event: HandlerEvent) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    let client: MongoClient | null = null;

    try {
        const body = JSON.parse(event.body ?? '{}') as { email?: unknown };
        const cleaned = String(body.email ?? '').trim().toLowerCase();

        if (!isValidEmail(cleaned)) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email' }) };
        }

        const { db, client: mongoClient } = await getDb();
        client = mongoClient;

        const coll = db.collection('waitlist');
        await coll.createIndex({ email: 1 }, { unique: true });

        const now = new Date();
        const { upsertedCount } = await coll.updateOne(
            { email: cleaned },
            {
                $setOnInsert: {
                    email: cleaned,
                    createdAt: now,
                    source: 'landing',
                    welcomeEmailStatus: 'pending',
                },
            },
            { upsert: true },
        );

        if (upsertedCount === 1) {
            try {
                await sendWelcomeEmail(cleaned);
                await coll.updateOne(
                    { email: cleaned },
                    { $set: { welcomeSentAt: new Date(), welcomeEmailStatus: 'sent', updatedAt: new Date() } },
                );
                console.log('[join-waitlist] welcome email sent to', cleaned);
            } catch (mailErr: unknown) {
                const message = mailErr instanceof Error ? mailErr.message : 'Unknown mail error';
                await coll.updateOne(
                    { email: cleaned },
                    { $set: { welcomeEmailStatus: 'failed', welcomeEmailError: message, updatedAt: new Date() } },
                );
                console.error('[join-waitlist] email error:', mailErr);
            }
        } else {
            console.log('[join-waitlist] duplicate submit, skipping email for', cleaned);
        }

        return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Server error';
        console.error('[join-waitlist] fatal error:', err);
        return { statusCode: 500, headers, body: JSON.stringify({ error: message }) };
    } finally {
        if (client) await client.close();
    }
};