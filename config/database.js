const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017'; 

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToMongoDB;
