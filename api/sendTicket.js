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
      return res.status(400).json({ error: "Missing required fields." });
    }

    const qrDataUrl = await QRCode.toDataURL(roll, {
      margin: 1,
      width: 160,
      color: {
        dark: "#000000",
        light: "#00000000"
      }
    });
    const qrImageBytes = Buffer.from(qrDataUrl.split(",")[1], "base64");

    const templatePath = path.join(process.cwd(), "src", "templates", "ticket.pdf");
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    pdfDoc.registerFontkit(fontkit);

    const fontBytes = fs.readFileSync(path.join(process.cwd(), "src", "assets", "fonts", "Michroma-Regular.ttf"));
    const customFont = await pdfDoc.embedFont(fontBytes);

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

    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    page.drawImage(qrImage, {
      x: 463,
      y: 49,
      width: 125,
      height: 125,
    });

    const pdfBytes = await pdfDoc.save();

    fs.writeFileSync("test-ticket.pdf", pdfBytes);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Shilpkala 2025" <${GMAIL_USER}>`,
      to: email,
      subject: "Your Shilpkala 2025 Fest Ticket",
      text: `Dear ${name},\n\nPlease find attached your personalized fest ticket for Shilpkala 2025.\n\nSlot: ${slot}\nRoll: ${roll}\n\nShow this ticket (PDF) at the venue.\n\nBest,\nShilpkala Team`,
      attachments: [
        {
          filename: `Shilpkala2025_Ticket_${roll}.pdf`,
          content: pdfBytes,
        },
      ],
    });

    return res.status(200).json({ success: true, message: "Ticket sent successfully!" });
  } catch (err) {
    console.error("Ticket API error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express API running at http://localhost:${PORT}/api/sendTicket`);
});