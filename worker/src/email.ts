import nodemailer from "nodemailer";

export async function sendEmail(to: string, body: string) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: "adarshkamble01@gmail.com",
      to,
      subject: "Hello from FlowKit",
      text: body,
    });
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error; // or handle it however makes sense for your app
  }
}
