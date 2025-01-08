const crypto = require("crypto");

exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

exports.generateRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (error, buff) => {
      if (error) return reject(error);

      const bufferString = buff.toString("hex");

      resolve(bufferString);
    });
  });
};

exports.notFoundError = (req, res) => this.sendError(res, "Not found!!", 404);
