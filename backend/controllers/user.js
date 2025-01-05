const EmailVerificationToken = require("../models/emailVerificationToken");
const User = require("../models/user");
const { verifyEmailHTML } = require("../templates/verifyEmailHTML");
const { isValidObjectId } = require("mongoose");
const { welcomeEmailHTML } = require("../templates/WeclomeEmailHTML");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { sendError } = require("../utils/helper");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });

  if (oldUser) return sendError(res, "This is email already in use");

  const newUser = new User({ name, email, password });

  await newUser.save();

  let OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  var transport = generateMailTransporter();

  transport
    .sendMail({
      from: "verification@moviereview.com",
      to: newUser.email,
      subject: "Email Verification",
      html: verifyEmailHTML({ OTP }),
    })
    .then(() => {
      res.status(201).json({
        message:
          "Please verify your email. OTP has been sent to your email account!",
      });
    })
    .catch((err) => {
      console.log(err);
      sendError(res, "Failed to send verification email.", 500);
    });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user ID!", 400);

  const user = await User.findById(userId);

  if (!user) return sendError(res, "User not found!", 404);

  if (user.isVerified) return sendError(res, "User is already verified!", 409);

  const token = await EmailVerificationToken.findOne({ owner: userId });

  if (!token) return sendError(res, "Verification token not found!", 404);

  const isMatched = await token.compareToken(OTP);

  if (!isMatched)
    return sendError(res, "Invalid OTP! Please provide a valid code.", 400);

  user.isVerified = true;

  await user.save();

  var transport = generateMailTransporter();

  transport
    .sendMail({
      from: "verification@moviereview.com",
      to: user.email,
      subject: "Email Welcome",
      html: welcomeEmailHTML("Welcome to our app and thanks for choosing us."),
    })
    .then(async () => {
      await EmailVerificationToken.findByIdAndDelete(token._id);

      res.status(200).json({ message: "Your email is verified" });
    })
    .catch((err) => {
      console.log(err);
      sendError(res, "Failed to send welcome email.", 500);
    });
};

exports.resendEmailVerification = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);

  if (!user) return sendError(res, "User not found!", 404);

  if (user.isVerified) return sendError(res, "User is already verified!", 409);

  const alreadyHaveToken = await EmailVerificationToken.findOne({
    owner: userId,
  });

  if (alreadyHaveToken)
    return sendError(
      res,
      "You can only request verification again after one hour.",
      429
    );

  let OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  var transport = generateMailTransporter();

  transport
    .sendMail({
      from: "verification@moviereview.com",
      to: user.email,
      subject: "Email Verification",
      html: verifyEmailHTML({ OTP }),
    })
    .then(() => {
      res.status(201).json({
        message:
          "Please verify your email. OTP has been sent to your email account!",
      });
    })
    .catch((err) => {
      console.log(err);
      sendError(res, "Failed to send verification email.", 500);
    });
};
