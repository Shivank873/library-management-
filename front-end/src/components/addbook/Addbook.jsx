import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../lib/api';

const initialBook = {
  book_name: '',
  book_author: '',
  book_page_number: '',
  book_price: '',
  book_edition: '',
  book_description: '',
};

export const Addbook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState(initialBook);
  const [submitting, setSubmitting] = useState(false);

  const handler = (event) => {
    const { name, value } = event.target;
    setBook((currentBook) => ({ ...currentBook, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const response = await api.post('/books', {
        ...book,
        book_page_number: Number(book.book_page_number),
        book_price: Number(book.book_price),
      });

      toast.success(response.data.message);
      setBook(initialBook);
      setTimeout(() => navigate('/book-details'), 800);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to add book.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <Toaster position="top-right" />
      <div className="form-card mx-auto">
        <div className="mb-4">
          <p className="eyebrow mb-2">New Catalog Entry</p>
          <h3 className="mb-1">Add a new book</h3>
          <p className="text-secondary mb-0">
            Save complete book details so the collection stays searchable and organized.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="book_name" className="form-label">
              Book Name
            </label>
            <input
              type="text"
              className="form-control"
              id="book_name"
              name="book_name"
              value={book.book_name}
              onChange={handler}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="book_author" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="book_author"
              name="book_author"
              value={book.book_author}
              onChange={handler}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="book_page_number" className="form-label">
              Page Number
            </label>
            <input
              type="number"
              className="form-control"
              id="book_page_number"
              name="book_page_number"
              value={book.book_page_number}
              onChange={handler}
              min="1"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="book_price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="book_price"
              name="book_price"
              value={book.book_price}
              onChange={handler}
              min="0"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="book_edition" className="form-label">
              Edition
            </label>
            <input
              type="text"
              className="form-control"
              id="book_edition"
              name="book_edition"
              value={book.book_edition}
              onChange={handler}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="book_description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="book_description"
              name="book_description"
              rows="6"
              value={book.book_description}
              onChange={handler}
              required
            />
          </div>

          <div className="col-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-dark px-4" disabled={submitting}>
              {submitting ? 'Saving...' : 'Submit Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
