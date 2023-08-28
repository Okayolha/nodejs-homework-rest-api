const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "okay.olha@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const emailOptions = {
    from: "okay.olha@meta.ua",
  to: "okay.olha@gmail.com",
  subject: "Nodemailer test",
  text: "Test.... U did it!",
};

transporter
  .sendMail(emailOptions)
  .then((info) => console.log(info))
  .catch((err) => console.log(err));

module.exports = transporter;
