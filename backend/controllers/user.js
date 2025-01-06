const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const EmailVerificationToken = require("../models/emailVerificationToken");
const User = require("../models/user");
const { verifyEmailHTML } = require("../templates/verifyEmailHTML");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { sendError, generateRandomBytes } = require("../utils/helper");
const PasswordResetToken = require("../models/passwordResetToken");
const {
  resetPasswordEmailHTML,
} = require("../templates/resetPasswordEmailHTML");
const { welcomeEmailHTML } = require("../templates/welcomeEmailHTML");
const {
  passwordChangedEmailHTML,
} = require("../templates/passwordChangedEmailHTML");

exports.create = async (req, res) => {
  try {
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

    const transport = generateMailTransporter();
    transport.sendMail({
      from: "verification@moviereview.com",
      to: newUser.email,
      subject: "Email Verification",
      html: verifyEmailHTML({ OTP }),
    });

    res.status(201).json({
      message:
        "Please verify your email. OTP has been sent to your email account!",
    });
  } catch (err) {
    console.error(err);
    sendError(res, "An unexpected error occurred.", 500);
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { userId, OTP } = req.body;

    if (!isValidObjectId(userId))
      return sendError(res, "Invalid user ID!", 400);

    const user = await User.findById(userId);
    if (!user) return sendError(res, "User not found!", 404);
    if (user.isVerified)
      return sendError(res, "User is already verified!", 409);

    const token = await EmailVerificationToken.findOne({ owner: userId });
    if (!token) return sendError(res, "Verification token not found!", 404);

    const isMatched = await token.compareToken(OTP);
    if (!isMatched)
      return sendError(res, "Invalid OTP! Please provide a valid code.", 400);

    user.isVerified = true;
    await user.save();

    const transport = generateMailTransporter();
    transport.sendMail({
      from: "verification@moviereview.com",
      to: user.email,
      subject: "Email Welcome",
      html: welcomeEmailHTML("Welcome to our app and thanks for choosing us."),
    });

    await EmailVerificationToken.findByIdAndDelete(token._id);

    res.status(200).json({ message: "Your email is verified" });
  } catch (err) {
    console.error(err);
    sendError(res, "An unexpected error occurred.", 500);
  }
};

exports.resendEmailVerification = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return sendError(res, "User not found!", 404);
    if (user.isVerified)
      return sendError(res, "User is already verified!", 409);

    const alreadyHasToken = await EmailVerificationToken.findOne({
      owner: userId,
    });
    if (alreadyHasToken)
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

    const transport = generateMailTransporter();
    transport.sendMail({
      from: "verification@moviereview.com",
      to: user.email,
      subject: "Email Verification",
      html: verifyEmailHTML({ OTP }),
    });

    res.status(201).json({
      message:
        "Please verify your email. OTP has been sent to your email account!",
    });
  } catch (err) {
    console.error(err);
    sendError(res, "An unexpected error occurred.", 500);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return sendError(res, "Email is missing!", 400);

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "User is not found!", 404);

    const alreadyHasToken = await PasswordResetToken.findOne({
      owner: user._id,
    });
    if (alreadyHasToken)
      return sendError(
        res,
        "You can only request verification again after one hour.",
        429
      );

    const token = await generateRandomBytes();
    const newPasswordResetToken = await PasswordResetToken({
      owner: user._id,
      token,
    });

    await newPasswordResetToken.save();
    const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}&id=${user._id}`;

    const transport = generateMailTransporter();
    transport.sendMail({
      from: "securiyty@moviereview.com",
      to: user.email,
      subject: "Reset Password",
      html: resetPasswordEmailHTML(resetPasswordUrl),
    });

    res.status(200).json({
      message: "Please check your email to reset your password!",
    });
  } catch (err) {
    console.error(err);
    sendError(res, "An unexpected error occurred.", 500);
  }
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  try {
    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    console.error(err);
    sendError(res, "An unexpected error occurred.", 500);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, userId } = req.body;

    if (!newPassword || !userId)
      return sendError(res, "Invalid input data", 400);

    const user = await User.findById(userId);
    if (!user) return sendError(res, "User not found!", 404);

    const isMatched = await user.comparePassword(newPassword);
    if (isMatched)
      return sendError(res, "The new password must be different", 400);

    user.password = newPassword;
    await user.save();

    if (req.resetToken) {
      await PasswordResetToken.findByIdAndDelete(req.resetToken._id);
    }

    const transport = generateMailTransporter();
    await transport.sendMail({
      from: "security@moviereview.com",
      to: user.email,
      subject: "Password Reset",
      html: passwordChangedEmailHTML(),
    });

    res.status(201).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    sendError(res, "An unexpected error occurred.", 500);
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return sendError(res, "Invalid credentials!", 400);

    const isMatched = await user.comparePassword(password);
    if (!isMatched) return sendError(res, "Invalid credentials!", 400);

    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: `${process.env.JWT_EXPIRES}` }
    );

    res.status(200).json({
      message: "Login successfully!",
      user: { email: user.email, token: jwtToken },
    });
  } catch (err) {
    console.error(err);
    sendError(res, "An unexpected error occurred.", 500);
  }
};
