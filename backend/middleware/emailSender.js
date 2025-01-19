const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,  
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});


async function sendEmail(mailOptions) {
  try {
    console.log('Sending email with the following options:', mailOptions); // Log mailOptions
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId); // Confirm message was sent
  } catch (error) {
    console.error("Error sending email:", error); // Log any errors
    throw error; // Re-throw the error to propagate it back
  }
}


module.exports = {sendEmail}