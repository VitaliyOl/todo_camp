import nodemailer, { SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { EMAIL, PASS } = process.env;

if (!EMAIL || !PASS) {
  throw new Error("EMAIL and PASS environment variables are required");
}

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

const sendEmail = async (data: SendMailOptions): Promise<boolean> => {
  try {
    const email = { ...data, from: EMAIL };
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;