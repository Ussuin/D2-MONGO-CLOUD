const connectDB = require("../../db");
const User = require("../../models/User");

module.exports = async (req, res) => {
  await connectDB();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
      return res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Método ${req.method} no permitido`);
};
