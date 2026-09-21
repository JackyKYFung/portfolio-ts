"use server";

import { Resend } from "resend";

// Initialize Resend on the server side using your environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailPayload {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

export async function sendContactEmail(payload: SendEmailPayload) {
  // Anti-Spam Honeypot Guard: Discard quietly if filled by bot
  if (payload.honeypot) {
    console.warn("[SECURITY] Bot activity deflected via honeypot trap.");
    return { success: true }; 
  }

  // Server-Side Validation
  if (!payload.name || !payload.email || !payload.message) {
    return { success: false, error: "Required fields are missing." };
  }

  try {
    const data = await resend.emails.send({
    from: "Portfolio Portal <no-reply@jfunki.com>",
    to: "j12funki@gmail.com",
    subject: `💼 Portfolio Lead: ${payload.name}`,
    replyTo: payload.email,
    html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #fafafa;">
        <div style="background-color: #ffffff; padding: 32px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
            <div style="text-transform: uppercase; letter-spacing: 0.15em; font-size: 11px; font-weight: 700; color: #10b981; margin-bottom: 24px; font-family: monospace;">
            // INBOUND DATA INTERCEPTED
            </div>
            
            <h2 style="font-size: 20px; font-weight: 700; color: #111827; margin: 0 0 24px 0;">New Message Received</h2>
            
            <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Sender Name</label>
            <div style="font-size: 15px; color: #1f2937; font-weight: 500;">${payload.name}</div>
            </div>
            
            <div style="margin-bottom: 24px;">
            <label style="display: block; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Email Address</label>
            <div style="font-size: 15px; color: #2563eb;"><a href="mailto:${payload.email}" style="text-decoration: none; color: inherit;">${payload.email}</a></div>
            </div>
            
            <div style="border-top: 1px solid #f3f4f6; padding-top: 24px; margin-top: 24px;">
            <label style="display: block; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 600; margin-bottom: 8px;">Message Content</label>
            <div style="font-size: 15px; color: #374151; line-height: 1.6; background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #f3f4f6; white-space: pre-wrap;">${payload.message}</div>
            </div>
        </div>
        </div>
    `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Resend API Failure:", error);
    return { success: false, error: "Failed to dispatch email transaction." };
  }
}