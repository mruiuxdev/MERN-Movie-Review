const User = require("../models/user");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });

  if (oldUser)
    return res.status(401).json({ error: "This is email already in use" });

  const newUser = new User({ name, email, password });

  await newUser.save();

  return res.status(201).json(newUser);
};
