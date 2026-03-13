import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

export const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(initialBook);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getDataById = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/books/${id}`);
        setBook(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to load book.');
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    getDataById();
  }, [id]);

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      const response = await api.put(`/books/${id}`, {
        ...book,
        book_page_number: Number(book.book_page_number),
        book_price: Number(book.book_price),
      });
      toast.success(response.data.message);
      setTimeout(() => navigate('/book-details'), 800);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to update book.');
    } finally {
      setSubmitting(false);
    }
  };

  const handler = (event) => {
    const { name, value } = event.target;
    setBook((currentBook) => ({ ...currentBook, [name]: value }));
  };

  return (
    <div className="container py-5">
      <Toaster position="top-right" />
      <div className="form-card mx-auto">
        <div className="mb-4">
          <p className="eyebrow mb-2">Catalog Maintenance</p>
          <h3 className="mb-1">Edit book details</h3>
          <p className="text-secondary mb-0">
            Keep titles, pricing, and descriptions accurate for your team.
          </p>
        </div>

        {loading ? (
          <p className="mb-0">Loading book details...</p>
        ) : (
          <form onSubmit={handleEdit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Book Name</label>
              <input
                type="text"
                className="form-control"
                value={book.book_name}
                name="book_name"
                onChange={handler}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                value={book.book_author}
                name="book_author"
                onChange={handler}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Page Number</label>
              <input
                type="number"
                className="form-control"
                value={book.book_page_number}
                name="book_page_number"
                onChange={handler}
                min="1"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={book.book_price}
                name="book_price"
                onChange={handler}
                min="0"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Edition</label>
              <input
                type="text"
                className="form-control"
                value={book.book_edition}
                name="book_edition"
                onChange={handler}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={4}
                name="book_description"
                onChange={handler}
                value={book.book_description}
                required
              />
            </div>

            <div className="col-12 d-flex justify-content-end">
              <button type="submit" className="btn btn-dark px-4" disabled={submitting}>
                {submitting ? 'Saving...' : 'Update Book'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
