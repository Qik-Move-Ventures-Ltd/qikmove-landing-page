// @deno-types="npm:mongodb@6.10.0/mongodb.d.ts"
import { MongoClient } from 'npm:mongodb@6.10.0';
import { SMTPClient } from 'npm:emailjs@4.0.3';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const MONGODB_URI = Deno.env.get('MONGODB_URI')!;
const MONGODB_DB_NAME = Deno.env.get('MONGODB_DB_NAME') || 'qikmove';

// SMTP configuration (Brevo). Add these as Edge Function secrets before deploying:
//   SMTP_HOST=smtp-relay.brevo.com
//   SMTP_PORT=587
//   SMTP_USER=<your brevo smtp login, e.g. adf665001@smtp-brevo.com>
//   SMTP_PASSWORD=<your brevo smtp master password / key>
//   SMTP_FROM_EMAIL=hi.qikmove@11400805.brevosend.com
//   SMTP_FROM_NAME=QikMove
const SMTP_HOST = Deno.env.get('SMTP_HOST') || 'smtp-relay.brevo.com';
const SMTP_PORT = Number(Deno.env.get('SMTP_PORT') || '587');
const SMTP_USER = Deno.env.get('SMTP_USER') || '';
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') || '';
const SMTP_FROM_EMAIL = Deno.env.get('SMTP_FROM_EMAIL') || 'hi.qikmove@11400805.brevosend.com';
const SMTP_FROM_NAME = Deno.env.get('SMTP_FROM_NAME') || 'QikMove';

let cachedClient: MongoClient | null = null;
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient.db(MONGODB_DB_NAME);
}

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 255;
}

const welcomeHtml = (email: string) => `
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
          <p style="font-size:14px;line-height:1.7;color:#b5b5be;margin:0 0 14px;">QikMove is a logistics & delivery platform connecting customers and riders directly. Post a dispatch, see nearby riders, negotiate a fair price, and watch your parcel move — all from your phone.</p>
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

async function sendWelcomeEmail(email: string) {
  if (!SMTP_USER || !SMTP_PASSWORD) {
    throw new Error('SMTP credentials are not configured (SMTP_USER / SMTP_PASSWORD)');
  }

  const client = new SMTPClient({
    user: SMTP_USER,
    password: SMTP_PASSWORD,
    host: SMTP_HOST,
    port: SMTP_PORT,
    tls: SMTP_PORT === 587, // STARTTLS on 587
  });

  const html = welcomeHtml(email);

  await client.sendAsync({
    from: `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL}>`,
    to: email,
    subject: "You're in 🚀 Welcome to QikMove",
    text: "Welcome to QikMove! You're on the early-access list. We'll hit you up the moment we launch.",
    attachment: [{ data: html, alternative: true }],
  } as any);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { email } = await req.json();
    const cleaned = String(email || '').trim().toLowerCase();
    if (!isValidEmail(cleaned)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const db = await getDb();
    const coll = db.collection('waitlist');
    await coll.createIndex({ email: 1 }, { unique: true });

    const now = new Date();

    // Attempt to insert the document. upsertedCount === 1 means this is a
    // brand-new address; === 0 means it already existed (repeat submit).
    const upsertResult = await coll.updateOne(
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

    if (upsertResult.upsertedCount === 1) {
      // Newly inserted — send the welcome email.
      try {
        await sendWelcomeEmail(cleaned);
        await coll.updateOne(
          { email: cleaned },
          {
            $set: {
              welcomeSentAt: new Date(),
              welcomeEmailStatus: 'sent',
              updatedAt: new Date(),
            },
          },
        );
        console.log('Welcome email sent to', cleaned);
      } catch (e: any) {
        await coll.updateOne(
          { email: cleaned },
          {
            $set: {
              welcomeEmailStatus: 'failed',
              welcomeEmailError: e?.message || 'Unknown email error',
              updatedAt: new Date(),
            },
          },
        );
        console.error('Welcome email error for', cleaned, e);
      }
    } else {
      // Address already existed — do not send a duplicate email.
      console.log('Repeat submit, skipping welcome email for', cleaned);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('join-waitlist error:', err);
    return new Response(JSON.stringify({ error: err?.message || 'Server error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});