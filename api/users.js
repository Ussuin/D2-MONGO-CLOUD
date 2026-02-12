const connectDB = require("../db");
const User = require("../models/User");

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    try {
      const user = new User(req.body);
      await user.save();
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Método ${req.method} no permitido`);
};
