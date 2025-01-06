const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");
const { sendError } = require("../utils/helper");

exports.isValidPasswordResetToken = async (req, res, next) => {
  try {
    const { token, userId } = req.body;

    if (!token.trim() || !isValidObjectId(userId))
      return sendError(res, "Invalid request!", 400);

    const resetToken = await PasswordResetToken.findOne({ owner: userId });
    if (!resetToken)
      return sendError(res, "Unauthorized access, invalid request", 401);

    const isMatched = await resetToken.compareToken(token);
    if (!isMatched)
      return sendError(res, "Unauthorized access, invalid request", 401);

    req.resetToken = resetToken;

    next();
  } catch (error) {
    console.error("Error in isValidPasswordResetToken:", error);
    return sendError(res, "An unexpected error occurred.", 500);
  }
};
