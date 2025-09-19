import 'dotenv/config';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { PDFDocument, rgb } from "pdf-lib";
import QRCode from "qrcode";
import nodemailer from "nodemailer";

const fontkit = require('fontkit');

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

const app = express();
app.use(bodyParser.json());

app.post("/api/sendTicket", async (req, res) => {
  try {
    const { name, roll, email, slot } = req.body;
    if (!name || !roll || !email || !slot) {
      console.error(`[${new Date().toISOString()}] [ValidationError] Missing required fields:`, req.body);
      return res.status(400).json({ error: "Missing required fields." });
    }

    let qrDataUrl;
    let qrImageBytes;
    let templateBytes;
    let fontBytes;
    let pdfDoc;
    let customFont;
    let qrImage;
    let pdfBytes;
    try {
      qrDataUrl = await QRCode.toDataURL(roll, {
        margin: 1,
        width: 160,
        color: {
          dark: "#000000",
          light: "#00000000"
        }
      });
      qrImageBytes = Buffer.from(qrDataUrl.split(",")[1], "base64");
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [QRCodeError] Failed to generate QR:`, err);
      return res.status(500).json({ error: "Failed to generate QR code." });
    }

    try {
      const templatePath = path.join(process.cwd(), "src", "templates", "ticket.pdf");
      templateBytes = fs.readFileSync(templatePath);
      pdfDoc = await PDFDocument.load(templateBytes);
      pdfDoc.registerFontkit(fontkit);

      fontBytes = fs.readFileSync(path.join(process.cwd(), "src", "assets", "fonts", "Michroma-Regular.ttf"));
      customFont = await pdfDoc.embedFont(fontBytes);
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [FileError] Failed to load template or font:`, err);
      return res.status(500).json({ error: "Failed to load ticket template or font." });
    }

    try {
      const page = pdfDoc.getPages()[0];
      page.drawText(name, {
        x: 79,
        y: 30,
        size: 10,
        font: customFont,
        color: rgb(1, 1, 1),
      });
      page.drawText(roll, {
        x: 262,
        y: 30,
        size: 10,
        font: customFont,
        color: rgb(1, 1, 1),
      });
      page.drawText(slot, {
        x: 401,
        y: 30,
        size: 10,
        font: customFont,
        color: rgb(1, 1, 1),
      });

      qrImage = await pdfDoc.embedPng(qrImageBytes);
      page.drawImage(qrImage, {
        x: 463,
        y: 49,
        width: 125,
        height: 125,
      });

      pdfBytes = await pdfDoc.save();
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [PDFError] Failed to generate PDF:`, err);
      return res.status(500).json({ error: "Failed to generate ticket PDF." });
    }

    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      });
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [MailTransportError] Failed to create mail transporter:`, err);
      return res.status(500).json({ error: "Failed to initialize mail service." });
    }

    const mailSubject = "OD Ticket | Shilpkala Showcase | Shilpkala 2025";
    const mailBodyHtml = `
<div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 15px; color: #222;">
  <p>Dear ${name},</p>
  <p>Greetings!</p>
  <p>We are delighted to confirm your registration for the exhibition:</p>
  <p>
    <b>Shilpkala Showcase - A Gallery of Young Visionaries conducted by the Fine Arts Club</b> at <b>Shilpkala 2025</b>.<br>
  </p>
  <p>
    <b>Here are your details:</b><br>
    Name: <b>${name}</b><br>
    Roll Number: <b>${roll}</b><br>
    Slot: <b>${slot}</b>
  </p>
  <p>Your ticket is attached to this mail as a PDF.</p>
  <p>
    This ticket will serve as your attendance proof for visiting the exhibition.<br>
    The PDF should be ready when you visit so the team can scan it at the venue.
  </p>
  <p>
    For updates and highlights, follow the Fine Arts Club on Instagram:<br>
    <a href="https://www.instagram.com/kristujayanti_fineartsclub/">https://www.instagram.com/kristujayanti_fineartsclub/</a>
  </p>
  <p>We look forward to your presence at the Shilpkala Showcase!</p>
  <p>Warm regards,<br>Shilpkala 2025 Team</p>
</div>
`;

    const mailBody = `
Dear ${name},

Greetings!

We are delighted to confirm your registration for the exhibition:

Shilpkala Showcase – A Gallery of Young Visionaries conducted by the Fine Arts Club at Shilpkala 2025

Here are your details:
- Name: ${name}
- Roll Number: ${roll}
- Slot: ${slot}

Your OD ticket is attached to this mail as a PDF.

This ticket will serve as your attendance proof for visiting the exhibition.
The PDF should be ready when you visit so the team can scan it at the venue.

For updates and highlights, follow the Fine Arts Club on Instagram:
https://www.instagram.com/kristujayanti_fineartsclub/

We look forward to your presence at the Shilpkala Showcase!

Warm regards,  
Shilpkala 2025 Team
`.trim();

    try {
      await transporter.sendMail({
        from: `"Shilpkala 2025" <${GMAIL_USER}>`,
        to: email,
        subject: mailSubject,
        text: mailBody,
        html: mailBodyHtml,
        attachments: [
          {
            filename: `Shilpkala2025_Ticket_${roll}.pdf`,
            content: pdfBytes,
          },
        ],
      });
    } catch (err) {
      console.error(`[${new Date().toISOString()}] [MailSendError] Failed to send mail to ${email}:`, err);
      return res.status(500).json({ error: "Failed to send ticket email." });
    }

    return res.status(200).json({ success: true, message: "Ticket sent successfully!" });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] [UnknownError]`, err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express API running at http://localhost:${PORT}/api/sendTicket`);
});