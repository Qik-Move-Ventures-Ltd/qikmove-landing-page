import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { MongoClient } from 'npm:mongodb@6.10.0';

const MONGODB_URI = Deno.env.get('MONGODB_URI')!;
const MONGODB_DB_NAME = Deno.env.get('MONGODB_DB_NAME') || 'qikmove';
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')!;
const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')!;

const SENDER = { name: 'QikMove', email: 'hi.qikmove@gmail.com' };

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
            <p style="margin:0;font-size:13px;color:#9aff5a;font-weight:600;">📍 Built in Enugu. Made for Nigeria.</p>
            <p style="margin:6px 0 0;font-size:13px;color:#8a8a92;">We'll hit you up the second we launch. Stay tuned.</p>
          </div>
          <p style="margin:24px 0 0;font-size:12px;color:#6a6a72;">You're receiving this because <b style="color:#9a9aa2;">${email}</b> joined the QikMove waitlist.</p>
          <p style="margin:6px 0 0;font-size:12px;color:#6a6a72;">QikMove — 143 Jedidiah Estate Centenary, Enugu, Nigeria</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

async function sendWelcomeEmail(email: string) {
  const res = await fetch('https://connector-gateway.lovable.dev/brevo/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: SENDER,
      to: [{ email }],
      subject: "You're in 🚀 Welcome to QikMove",
      htmlContent: welcomeHtml(email),
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error('Brevo send failed', res.status, txt);
    throw new Error(`Brevo ${res.status}: ${txt}`);
  }
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
    await coll.updateOne(
      { email: cleaned },
      { $setOnInsert: { email: cleaned, createdAt: now, source: 'landing' } },
      { upsert: true },
    );

    // Claim the welcome email before calling Brevo so repeat submits cannot queue duplicates.
    const staleSend = new Date(now.getTime() - 10 * 60 * 1000);
    const claim = await coll.updateOne(
      {
        email: cleaned,
        welcomeSentAt: { $exists: false },
        $or: [
          { welcomeEmailStatus: { $exists: false } },
          { welcomeEmailStatus: 'pending' },
          { welcomeEmailStatus: 'failed' },
          { welcomeEmailStatus: 'sending', welcomeEmailStartedAt: { $lt: staleSend } },
        ],
      },
      {
        $set: {
          welcomeEmailStatus: 'sending',
          welcomeEmailStartedAt: now,
          updatedAt: now,
        },
      },
    );

    if (claim.modifiedCount === 1) {
      try {
        await sendWelcomeEmail(cleaned);
        await coll.updateOne(
          { email: cleaned },
          {
            $set: { welcomeSentAt: new Date(), welcomeEmailStatus: 'sent', updatedAt: new Date() },
            $unset: { welcomeEmailError: '' },
          },
        );
        console.log('Welcome email sent to', cleaned);
      } catch (e: any) {
        await coll.updateOne(
          { email: cleaned, welcomeEmailStatus: 'sending' },
          {
            $set: {
              welcomeEmailStatus: 'failed',
              welcomeEmailError: e?.message || 'Unknown email error',
              updatedAt: new Date(),
            },
          },
        );
        console.error('Welcome email error:', e);
      }
    } else {
      console.log('Welcome email already sent or in progress for', cleaned);
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