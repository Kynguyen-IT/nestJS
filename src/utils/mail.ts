import * as nodemailer from 'nodemailer';

import { MAILER_PASS, MAILER_USER } from '@environments';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false, // true
  host: 'smtp.gmail.com',
  port: 587, // 465 | 587
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendMail = async (
  type: string,
  code: string,
  email: string,
): Promise<any> => {
  const replacements = {
    forgotPassword: {
      subject: 'Reset Your Password',
      code,
    },
  };

  const mailOptions = {
    from: 'practive  📮:' + MAILER_USER, // sender address
    to: email, // list of receivers
    subject: replacements[type].subject,
    text: `You have requested to reset your password. Your Code: ${code}`,
    attachments: [],
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Message sent: ' + JSON.stringify(info));
    }
  });

  transporter.close();
};
