const mongoose = require('mongoose');

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true, // Recomendado para manejar URLs modernas
      useUnifiedTopology: true // Manejo de conexiones modernas
    });
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Termina el proceso si no se puede conectar
  }
}

module.exports = connectToDatabase;