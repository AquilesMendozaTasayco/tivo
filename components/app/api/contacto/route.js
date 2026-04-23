import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, telefono, email, modelo, mensaje } = body || {};

    if (!nombre || !telefono || !email || !modelo) {
      return Response.json(
        { ok: false, message: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const port = Number(process.env.SMTP_PORT || 465);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const to = process.env.CONTACT_TO || process.env.SMTP_USER;

    const subject = `Nueva solicitud CAMANX: ${nombre} (${modelo})`;

    const text = `
Nueva solicitud de contacto

Nombre:   ${nombre}
Teléfono: ${telefono}
Email:    ${email}
Modelo:   ${modelo}

Mensaje:
${mensaje || "-"}
`.trim();

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;max-width:600px">
        <h2 style="color:#1e3a8a;border-bottom:2px solid #2563eb;padding-bottom:8px">
          Nueva solicitud CAMANX
        </h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#555;width:120px"><b>Nombre</b></td><td>${escapeHtml(nombre)}</td></tr>
          <tr><td style="padding:8px 0;color:#555"><b>Teléfono</b></td><td>${escapeHtml(telefono)}</td></tr>
          <tr><td style="padding:8px 0;color:#555"><b>Email</b></td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 0;color:#555"><b>Modelo</b></td><td>${escapeHtml(modelo)}</td></tr>
        </table>
        <div style="margin-top:16px;padding:12px;background:#f1f5f9;border-left:3px solid #2563eb">
          <b style="color:#555">Mensaje:</b>
          <p style="margin:8px 0 0">${escapeHtml(mensaje || "-").replace(/\n/g, "<br/>")}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"CAMANX Web" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      text,
      html,
      replyTo: email,
    });

    return Response.json({ ok: true, message: "Enviado." });
  } catch (err) {
    console.error("[SMTP ERROR]", err);
    return Response.json(
      { ok: false, message: `Error SMTP: ${err.message}` },
      { status: 500 }
    );
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}