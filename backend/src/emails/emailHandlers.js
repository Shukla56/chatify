import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const response = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to Chatify!",
      html: createWelcomeEmailTemplate(name, clientURL),
    });

    // Resend SDK returns a response object; log it for debugging
    console.log("Welcome Email sent successfully", { to: email, response });
    return response;
  } catch (err) {
    console.error("Error sending welcome email:", err?.response || err?.message || err);
    // rethrow so callers can optionally react
    throw err;
  }
};