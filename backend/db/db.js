const mongoose = require('mongoose');

const db = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB CONNECTED');
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = { db };