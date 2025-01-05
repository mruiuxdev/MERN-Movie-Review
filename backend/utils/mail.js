const nodemailer = require("nodemailer");

exports.generateOTP = (OTPLength = 6) => {
  let OTP = "";

  for (let i = 1; i <= OTPLength; i++) {
    OTP += Math.round(Math.random() * 9);
  }

  return OTP;
};

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: parseInt(process.env.PORT_NODEMAILER, "10"),
    auth: {
      user: process.env.AUTH_USER_NODEMAILER,
      pass: process.env.AUTH_PASS_NODEMAILER,
    },
  });
