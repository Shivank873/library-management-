import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../lib/api';

export const Bookdetails = () => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const loadBooks = async (search = '') => {
    try {
      setLoading(true);
      const response = await api.get('/books', {
        params: search ? { search, page: 1, limit: 50 } : { page: 1, limit: 50 },
      });
      setBooks(response.data.data);
      setErrorMsg('');
    } catch (error) {
      setBooks([]);
      setErrorMsg(error.response?.data?.message || 'Unable to load books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this book?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1f2937',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Delete',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await api.delete(`/books/${id}`);
      await Swal.fire({
        title: 'Deleted',
        text: response.data.message,
        icon: 'success',
        confirmButtonColor: '#1f2937',
      });
      await loadBooks(searchText.trim());
    } catch (error) {
      await Swal.fire({
        title: 'Unable to delete',
        text: error.response?.data?.message || 'Please try again.',
        icon: 'error',
        confirmButtonColor: '#1f2937',
      });
    }
  };

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchText(value);
    await loadBooks(value.trim());
  };

  return (
    <div className="container py-5">
      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <p className="eyebrow mb-2">Collection</p>
            <h3 className="mb-1">Book Details</h3>
            <p className="text-secondary mb-0">
              Search, update, and remove books from your library.
            </p>
          </div>
          <Link to="/add-book" className="btn btn-dark">
            Add Another Book
          </Link>
        </div>

        <div className="row justify-content-center mb-4">
          <div className="col-lg-6">
            <input
              type="text"
              placeholder="Search by book name, author, or edition"
              value={searchText}
              onChange={handleSearchChange}
              className="form-control form-control-lg"
            />
          </div>
        </div>

        {errorMsg ? <div className="alert alert-warning">{errorMsg}</div> : null}

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Pages</th>
                <th>Price</th>
                <th>Edition</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Loading books...
                  </td>
                </tr>
              ) : books.length ? (
                books.map((book, index) => (
                  <tr key={book._id}>
                    <td>{index + 1}</td>
                    <td>{book.book_name}</td>
                    <td>{book.book_author}</td>
                    <td>{book.book_page_number}</td>
                    <td>Rs. {book.book_price}</td>
                    <td>{book.book_edition}</td>
                    <td className="description-cell">{book.book_description}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link to={`/edit/${book._id}`} className="btn btn-sm btn-outline-dark">
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
