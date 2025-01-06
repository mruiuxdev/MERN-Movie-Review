const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerification,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  signIn,
} = require("../controllers/user");
const {
  userValidator,
  validate,
  validatePassword,
  signInValidator,
} = require("../middlewares/validator");
const { isValidPasswordResetToken } = require("../middlewares/user");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-verify-email", resendEmailVerification);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-password-reset-token",
  isValidPasswordResetToken,
  sendResetPasswordTokenStatus
);
router.post(
  "/reset-password",
  validatePassword,
  validate,
  isValidPasswordResetToken,
  resetPassword
);
router.post("/sign-in", signInValidator, validate, signIn);

module.exports = router;
