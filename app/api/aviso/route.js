import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { correo } = await request.json();

    // Validación básica server-side
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !emailRegex.test(correo)) {
      return Response.json(
        { error: "Correo inválido" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // puerto 465 = SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ── Correo al usuario: confirmación de registro ──
    await transporter.sendMail({
      from: `"TIVO" <${process.env.SMTP_FROM}>`,
      to: correo,
      subject: "¡Te avisaremos cuando TIVO esté listo! 🚀",
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #d4eef9;">
          <div style="background: linear-gradient(135deg, #051e2e 0%, #0e4a6b 55%, #0f6998 100%); padding: 32px 40px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 26px; margin: 0; font-style: italic;">TIVO</h1>
            <p style="color: #7fdcf2; font-size: 12px; letter-spacing: 4px; text-transform: uppercase; margin: 8px 0 0;">Compartimos más que un viaje</p>
          </div>
          <div style="padding: 36px 40px; text-align: center;">
            <p style="font-size: 32px; margin: 0 0 16px;">🔔</p>
            <h2 style="color: #0e2a3d; font-size: 22px; margin: 0 0 12px;">¡Ya estás en la lista!</h2>
            <p style="color: #4a6170; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              Cuando TIVO esté disponible, te enviaremos un correo a <strong style="color: #0e4a6b;">${correo}</strong> para que seas uno de los primeros en unirte.
            </p>
            <div style="background: #f5fbfe; border: 1px solid #d4eef9; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
              <p style="color: #0e4a6b; font-size: 13px; font-weight: bold; margin: 0 0 6px;">¿Mientras tanto?</p>
              <p style="color: #4a6170; font-size: 13px; margin: 0;">Síguenos en Facebook para estar al tanto de las novedades.</p>
            </div>
            <a href="https://www.facebook.com/share/1CUfWHyhqJ/?mibextid=wwXIfr"
               style="display: inline-block; background: #0e4a6b; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 50px; font-size: 13px; font-weight: bold;">
              Seguir en Facebook
            </a>
          </div>
          <div style="background: #f5fbfe; padding: 20px 40px; text-align: center; border-top: 1px solid #d4eef9;">
            <p style="color: #9bb5c4; font-size: 11px; margin: 0;">No compartimos tu correo con nadie. Solo recibirás el aviso del lanzamiento.</p>
          </div>
        </div>
      `,
    });

    // ── Correo interno: notificación al equipo ──
    await transporter.sendMail({
      from: `"TIVO Notificaciones" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_TO,
      subject: `Nuevo registro de aviso de lanzamiento`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #0e4a6b;">Nuevo registro de aviso</h2>
          <p style="color: #4a6170;">Un usuario quiere ser notificado cuando TIVO se lance:</p>
          <p style="background: #f5fbfe; border: 1px solid #d4eef9; border-radius: 8px; padding: 14px 20px; color: #0e2a3d; font-weight: bold; font-size: 16px;">
            ${correo}
          </p>
          <p style="color: #9bb5c4; font-size: 12px;">Registrado el ${new Date().toLocaleString("es-PE", { timeZone: "America/Lima" })}</p>
        </div>
      `,
    });

    return Response.json({ ok: true });

  } catch (error) {
    console.error("[api/aviso] Error:", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}