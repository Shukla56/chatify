import { Resend } from "resend";
import { ENV } from "./env.js";

if (!ENV.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in environment. Welcome emails will fail to send.");
}

export const resendClient = new Resend(ENV.RESEND_API_KEY || "");

export const sender = {
    email: ENV.EMAIL_FROM || "no-reply@example.com",
    name: ENV.EMAIL_FROM_NAME || "Chatify",
};