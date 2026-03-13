const express = require('express');
const mongoose = require('mongoose');
const Library = require('../model/Library');

const router = express.Router();

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 50;

const normalizePagination = (query) => {
  const page = Math.max(Number.parseInt(query.page, 10) || DEFAULT_PAGE, 1);
  const requestedLimit = Number.parseInt(query.limit, 10) || DEFAULT_LIMIT;
  const limit = Math.min(Math.max(requestedLimit, 1), MAX_LIMIT);

  return { page, limit };
};

const createBookFilter = (search) => {
  if (!search) {
    return {};
  }

  return {
    $or: [
      { book_name: { $regex: search, $options: 'i' } },
      { book_author: { $regex: search, $options: 'i' } },
      { book_edition: { $regex: search, $options: 'i' } },
    ],
  };
};

router.get('/books/stats/summary', async (req, res) => {
  try {
    const [summary] = await Library.aggregate([
      {
        $group: {
          _id: null,
          totalBooks: { $sum: 1 },
          totalPages: { $sum: '$book_page_number' },
          averagePrice: { $avg: '$book_price' },
        },
      },
    ]);

    const recentBooks = await Library.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: 'Library summary fetched successfully.',
      data: {
        totalBooks: summary?.totalBooks || 0,
        totalPages: summary?.totalPages || 0,
        averagePrice: summary?.averagePrice
          ? Number(summary.averagePrice.toFixed(2))
          : 0,
        recentBooks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch library summary.',
      error: error.message,
    });
  }
});

router.get('/books', async (req, res) => {
  try {
    const { page, limit } = normalizePagination(req.query);
    const search = req.query.search?.trim() || '';
    const filter = createBookFilter(search);

    const [books, totalItems] = await Promise.all([
      Library.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Library.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      message: 'Books fetched successfully.',
      data: books,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit) || 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch books.',
      error: error.message,
    });
  }
});

router.get('/books/search/:name', async (req, res) => {
  try {
    const search = req.params.name?.trim() || '';
    const matchedBooks = await Library.find(createBookFilter(search)).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: matchedBooks.length
        ? 'Books found.'
        : 'No books matched your search.',
      data: matchedBooks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to search books.',
      error: error.message,
    });
  }
});

router.get('/books/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book id.',
      });
    }

    const book = await Library.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book details fetched successfully.',
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch book details.',
      error: error.message,
    });
  }
});

router.post('/books', async (req, res) => {
  try {
    const book = await Library.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Book added successfully.',
      data: book,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Unable to add book.',
      error: error.message,
    });
  }
});

router.put('/books/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book id.',
      });
    }

    const updatedBook = await Library.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book updated successfully.',
      data: updatedBook,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Unable to update book.',
      error: error.message,
    });
  }
});

router.delete('/books/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book id.',
      });
    }

    const deletedBook = await Library.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Book deleted successfully.',
      data: deletedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to delete book.',
      error: error.message,
    });
  }
});

module.exports = router;
