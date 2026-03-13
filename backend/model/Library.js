const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: true,
    trim: true
  },
  book_author: {
    type: String,
    required: true,
    trim: true
  },
  book_page_number: {
    type: Number,
    required: true,
    min: 1
  },
  book_price: {
    type: Number,
    required: true,
    min: 0
  },
  book_edition: {
    type: String,
    required: true,
    trim: true
  },
  book_description: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Library', bookSchema);