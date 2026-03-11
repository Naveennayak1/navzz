// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, budget, timeline, message, referral, formType } = body;

    // Basic validation
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required." }, { status: 400 });
    }

    /* ─── Send email via Nodemailer ───
       Replace the transporter config with your SMTP credentials.
       For production use: Resend, SendGrid, Postmark, or AWS SES.
    ─────────────────────────────────── */

    // Optional nodemailer block (uncomment + install if needed):
    /*
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: SITE.email,
      replyTo: email,
      subject: `[Navzz Portfolio] New ${formType} from ${name}`,
      text: `
Name: ${name}
Email: ${email || "—"}
Phone: ${phone || "—"}
Project Type: ${projectType || "—"}
Budget: ${budget || "—"}
Timeline: ${timeline || "—"}
Referral: ${referral || "—"}
Form Type: ${formType}

Message:
${message}
      `,
      html: `
<h2>New contact from Navzz Portfolio</h2>
<table>
  <tr><td><strong>Name</strong></td><td>${name}</td></tr>
  <tr><td><strong>Email</strong></td><td>${email || "—"}</td></tr>
  <tr><td><strong>Phone</strong></td><td>${phone || "—"}</td></tr>
  <tr><td><strong>Project Type</strong></td><td>${projectType || "—"}</td></tr>
  <tr><td><strong>Budget</strong></td><td>${budget || "—"}</td></tr>
  <tr><td><strong>Timeline</strong></td><td>${timeline || "—"}</td></tr>
  <tr><td><strong>Referral</strong></td><td>${referral || "—"}</td></tr>
</table>
<h3>Message</h3>
<p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
    */

    // For now, log and return success
    console.log("Contact form submission:", { name, email, phone, projectType, budget, message, formType });

    return NextResponse.json({ success: true, message: "Message received! I'll be in touch soon." });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
