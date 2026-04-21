import * as nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// 1. Fully swapped to Hostinger's mail courier (No Gmail)
const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: { 
        user: process.env.HOSTINGER_USER, 
        pass: process.env.HOSTINGER_PASSWORD 
    },
});

function buildHtml(name: string, email: string, phone: string, message: string) {
    return `<div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#eaeaea;border-radius:12px;overflow:hidden;border:1px solid #1a1a1a;">
    <div style="background:linear-gradient(135deg,#00f0ff10,#7000ff10);border-bottom:1px solid #00f0ff30;padding:28px 36px;">
      <p style="color:#00f0ff;font-family:monospace;font-size:11px;letter-spacing:3px;margin:0 0 6px;text-transform:uppercase;">New Contact Form Inquiry</p>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">WillowVibe | Data Synapse</h1>
    </div>
    <div style="padding:32px 36px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:11px;font-family:monospace;text-transform:uppercase;width:90px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#eaeaea;font-size:14px;font-weight:600;">${name}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:11px;font-family:monospace;text-transform:uppercase;">Email</td><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#00f0ff;font-size:14px;">${email}</td></tr>
        ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#888;font-size:11px;font-family:monospace;text-transform:uppercase;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #1f1f1f;color:#eaeaea;font-size:14px;">${phone}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;"><p style="color:#888;font-size:11px;font-family:monospace;text-transform:uppercase;margin-bottom:10px;">Message</p><div style="background:#111;border:1px solid #222;border-radius:8px;padding:16px;"><p style="color:#d0d0d0;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p></div></div>
      <div style="margin-top:32px;"><a href="mailto:${email}" style="display:inline-block;background:#00f0ff;color:#000;font-weight:700;font-size:12px;padding:10px 24px;border-radius:8px;text-decoration:none;font-family:monospace;">REPLY TO ${name.toUpperCase()}</a></div>
    </div>
    <div style="background:#050505;border-top:1px solid #1a1a1a;padding:16px 36px;"><p style="color:#444;font-size:11px;font-family:monospace;margin:0;">Sent via willowvibe.com · ${new Date().toUTCString()}</p></div>
  </div>`;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;
        
        if (!name || !email || !message) return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
        
        // 2. Updated to point to your Hostinger environment variables
        await transporter.sendMail({
            from: `"WillowVibe Website" <${process.env.HOSTINGER_USER}>`, 
            to: process.env.HOSTINGER_USER, 
            replyTo: email,
            subject: `New Inquiry from ${name} — WillowVibe`,
            html: buildHtml(name, email, phone ?? "", message),
        });
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        return NextResponse.json({ error: "Failed to send message. Please email us directly at contact@willowvibe.com" }, { status: 500 });
    }
}