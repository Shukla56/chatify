#!/usr/bin/env node
import 'dotenv/config';
import { resendClient, sender } from '../src/lib/resend.js';

async function main() {
  const to = process.argv[2] || process.env.TEST_TO;
  if (!to) {
    console.error('Usage: node scripts/send-test-email.js recipient@example.com');
    process.exit(1);
  }

  try {
    const resp = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to,
      subject: 'Test email from Chatify',
      html: `<p>This is a test email sent to <strong>${to}</strong>.</p>`,
    });

    console.log('Send response:', resp);
  } catch (err) {
    console.error('Send failed:', err?.response || err?.message || err);
    process.exitCode = 2;
  }
}

main();
