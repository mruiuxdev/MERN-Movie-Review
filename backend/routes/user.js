const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerification,
  forgetPassword,
} = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-verify-email", resendEmailVerification);
router.post("/forget-password", forgetPassword);

module.exports = router;
