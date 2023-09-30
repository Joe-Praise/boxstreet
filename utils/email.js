const nodemailer = require("nodemailer");
// const fs = require('fs');
// const htmlToText = require('html-to-text');

const sendEmail = async (options) => {
  // 1) create a Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Box Street <hello@jonas.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firstName = user.name.split(" ")[0];
//     this.url = url;
//     this.from = `Box Street <${process.env.EMAIL_FROM}>`;
//   }

//   newTransport() {
//     if (process.env.MODE === "PROD") {
//       // sendgrid
//       return 1;
//     }

//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }

//   async send(template, subject) {

//     // 1) Render HTML
//     const html = fs.readFile(`${__dirname}/../../views/emails/${template}.html`)
//     // 2) Define email options
//     const mailOptions = {
//         from: this.from,
//         to: this.to,
//         subject,
//         html: html,
//         text: htmlToText.fromString(html),

//     }

//     // 3) Create a password and send email
//     await this.newTransport().sendEmail(mailOptions);

//   }

//   async sendForgotPassword(){
//     await this.send('Forgot Password', 'Reset Password!');
//   }
// };

// const sendEmail = async options => {

//     const mailOptions = {
//         from: 'Box Street <alimipraisejoe@gmail.com'>,
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//     }

//     await this.newTransport().sendEmail(mailOptions);
// }
