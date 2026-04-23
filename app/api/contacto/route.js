import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, asunto, mensaje } = body;

    // Validación básica
    if (!nombre || !email || !asunto || !mensaje) {
      return Response.json(
        { ok: false, error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true para puerto 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const asuntoLabels = {
      consulta: "Consulta sobre productos",
      pedido: "Realizar un pedido",
      distribucion: "Distribución / mayorista",
      otro: "Otro",
    };

    await transporter.sendMail({
      from: `"Campo María BioLab 🌿" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `📩 Nuevo mensaje: ${asuntoLabels[asunto] ?? asunto} – ${nombre}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <style>
            body { margin: 0; padding: 0; background: #f4f9f5; font-family: Georgia, serif; }
            .wrapper { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #c6e3cb; }
            .header { background: #1a4a2e; padding: 32px 36px; }
            .header h1 { margin: 0; color: #ffffff; font-size: 22px; letter-spacing: 0.3px; }
            .header p { margin: 6px 0 0; color: #a8d4b4; font-size: 13px; font-family: Arial, sans-serif; }
            .body { padding: 32px 36px; }
            .field { margin-bottom: 20px; }
            .label { font-family: Arial, sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #4a8c5c; margin-bottom: 4px; }
            .value { font-family: Arial, sans-serif; font-size: 15px; color: #1a2e1f; line-height: 1.5; }
            .mensaje-box { background: #f8fdf8; border-left: 3px solid #1a4a2e; padding: 16px 20px; border-radius: 0 10px 10px 0; }
            .footer { background: #f0f7f1; padding: 18px 36px; border-top: 1px solid #e2f0e4; }
            .footer p { margin: 0; font-family: Arial, sans-serif; font-size: 11px; color: #7a9a80; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>🌿 Campo María BioLab</h1>
              <p>Nuevo mensaje desde el formulario de contacto</p>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">Nombre completo</div>
                <div class="value">${nombre}</div>
              </div>
              <div class="field">
                <div class="label">Correo electrónico</div>
                <div class="value"><a href="mailto:${email}" style="color:#1a4a2e">${email}</a></div>
              </div>
              ${telefono ? `
              <div class="field">
                <div class="label">Teléfono</div>
                <div class="value">${telefono}</div>
              </div>` : ""}
              <div class="field">
                <div class="label">Asunto</div>
                <div class="value">${asuntoLabels[asunto] ?? asunto}</div>
              </div>
              <div class="field">
                <div class="label">Mensaje</div>
                <div class="value mensaje-box">${mensaje.replace(/\n/g, "<br/>")}</div>
              </div>
            </div>
            <div class="footer">
              <p>Enviado desde el formulario de contacto de campomariabiolab.com &bull; ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    return Response.json(
      { ok: false, error: "Error interno al enviar el mensaje." },
      { status: 500 }
    );
  }
}