require('dotenv').config({ debug: false });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined in .env');
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('DB connection error:', error.message);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running.',
  });
});

app.use('/api', require('./routes/libraryRoutes'));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.',
  });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Something went wrong.',
  });
});

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
