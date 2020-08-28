const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(
    chalk.blue.underline(`MongoDB connected: ${conn.connection.host}`)
  );
};

module.exports = connectDB;
