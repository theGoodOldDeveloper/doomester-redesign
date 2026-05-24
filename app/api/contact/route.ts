import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validáció
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "A név, email és üzenet mezők kötelezőek!" },
        { status: 400 }
      );
    }

    // SMTP beállítások ellenőrzése
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const smtpHost = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
    // Port 465 használata secure: true-val (mint a működő kódban)
    const smtpPort = parseInt(process.env.SMTP_PORT || "465");
    const smtpFrom = (process.env.SMTP_FROM || smtpUser)?.trim();

    // Debug információk (jelszó nélkül)
    console.log("SMTP Config Check:", {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser ? `${smtpUser.substring(0, 3)}***` : "NINCS",
      pass: smtpPass ? `${smtpPass.length} karakter` : "NINCS",
      from: smtpFrom,
    });

    if (!smtpUser || !smtpPass) {
      console.error("SMTP beállítások hiányoznak. Kérlek, állítsd be a .env.local fájlban:");
      console.error("SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, SMTP_FROM");
      // Fallback: logoljuk az adatokat a konzolra
      console.log("=== KAPCSOLATFELVÉTEL (SMTP nincs beállítva) ===");
      console.log("Név:", name);
      console.log("Email:", email);
      console.log("Telefon:", phone || "Nincs megadva");
      console.log("Üzenet:", message);
      console.log("================================================");
      
      return NextResponse.json(
        { error: "Az email szolgáltatás nincs konfigurálva. Kérlek, vedd fel a kapcsolatot közvetlenül: thegoodolddeveloper@gmail.com" },
        { status: 503 }
      );
    }

    // Email transporter beállítása (mint a működő kódban)
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email tartalom (mint a működő kódban - formázott from cím)
    const mailOptions = {
      from: `"DOOMester.hu" <${smtpUser}>`, // Formázott from cím (mint a működő kódban)
      replyTo: email, // Válaszoláshoz - itt lesz a feladó emailje
      to: "thegoodolddeveloper@gmail.com",
      subject: `DOOMester - Új kapcsolatfelvétel: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0079e6; border-bottom: 2px solid #00bcd4; padding-bottom: 10px;">
            Új kapcsolatfelvétel a DOOMester.hu-ról
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Név:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Telefonszám:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #0079e6; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Üzenet:</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
            <p>Ez az email a DOOMester.hu kapcsolatfelvételi űrlapján keresztül érkezett.</p>
            <p>Válaszolj közvetlenül erre az emailre, hogy válaszolhass a feladónak.</p>
          </div>
        </div>
      `,
      text: `
Új kapcsolatfelvétel a DOOMester.hu-ról

Név: ${name}
Email: ${email}
${phone ? `Telefonszám: ${phone}` : ""}

Üzenet:
${message}

---
Ez az email a DOOMester.hu kapcsolatfelvételi űrlapján keresztül érkezett.
      `,
    };

    // Email küldése
    try {
      console.log("SMTP kapcsolat ellenőrzése...");
      await transporter.verify(); // Először ellenőrizzük a kapcsolatot
      console.log("SMTP kapcsolat sikeres!");
      
      console.log("Email küldése...");
      console.log("Email opciók:", {
        from: mailOptions.from,
        to: mailOptions.to,
        replyTo: mailOptions.replyTo,
        subject: mailOptions.subject,
      });
      
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sikeresen elküldve!");
      console.log("Message ID:", info.messageId);
      console.log("Response:", info.response);
      
      return NextResponse.json(
        { 
          message: "Az üzenet sikeresen elküldve!",
          messageId: info.messageId 
        },
        { status: 200 }
      );
    } catch (smtpError: any) {
      console.error("SMTP Error Details:", {
        code: smtpError.code,
        response: smtpError.response,
        command: smtpError.command,
      });
      
      // Részletesebb hibaüzenet
      let errorMessage = "Hiba történt az email küldése során.";
      
      if (smtpError.code === "EAUTH") {
        errorMessage = "SMTP hitelesítési hiba. Kérlek, ellenőrizd a .env.local fájlban a SMTP_USER és SMTP_PASS beállításokat. Gmail esetén App Password-t kell használni!";
      } else if (smtpError.code === "ECONNECTION") {
        errorMessage = "Nem sikerült csatlakozni az SMTP szerverhez. Kérlek, ellenőrizd a SMTP_HOST és SMTP_PORT beállításokat.";
      }
      
      // Fallback: logoljuk az adatokat
      console.log("=== KAPCSOLATFELVÉTEL (Email küldés sikertelen) ===");
      console.log("Név:", name);
      console.log("Email:", email);
      console.log("Telefon:", phone || "Nincs megadva");
      console.log("Üzenet:", message);
      console.log("================================================");
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Váratlan hiba történt. Kérlek, próbáld újra később." },
      { status: 500 }
    );
  }
}

