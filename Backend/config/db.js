const mongoose = require("mongoose");

const connectDB = async () => {
  try {
   // In db.js
const conn = await mongoose.connect(process.env.MONGO_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 serverSelectionTimeoutMS: 5000,
 autoIndex: false // Disable in production
});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
