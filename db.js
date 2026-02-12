const mongoose = require("mongoose");

let isConnected;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = conn.connections[0].readyState;
    console.log("MongoDB conectado en Vercel");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
  }
};

module.exports = connectDB;
