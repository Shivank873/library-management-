import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';

const initialSummary = {
  totalBooks: 0,
  totalPages: 0,
  averagePrice: 0,
  recentBooks: [],
};

export const Dashboard = () => {
  const [summary, setSummary] = useState(initialSummary);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoading(true);
        const response = await api.get('/books/stats/summary');
        setSummary(response.data.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  const stats = [
    { label: 'Total Books', value: summary.totalBooks },
    { label: 'Total Pages', value: summary.totalPages },
    { label: 'Average Price', value: `Rs. ${summary.averagePrice}` },
  ];

  return (
    <section className="container py-5">
      <div className="hero-panel mb-4">
        <div>
          <p className="eyebrow mb-2">Library Command Center</p>
          <h1 className="display-6 fw-bold mb-3">Manage your collection with confidence.</h1>
          <p className="text-secondary mb-0">
            Track books, review the latest additions, and jump straight into your daily
            library workflow.
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/add-book" className="btn btn-dark">
            Add a Book
          </Link>
          <Link to="/book-details" className="btn btn-outline-dark">
            View Collection
          </Link>
        </div>
      </div>

      {error ? <div className="alert alert-danger">{error}</div> : null}

      <div className="row g-4 mb-4">
        {stats.map((item) => (
          <div className="col-md-4" key={item.label}>
            <div className="stat-card">
              <p className="stat-label">{item.label}</p>
              <h2 className="stat-value">{loading ? '...' : item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="content-card">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <div>
            <h3 className="h4 mb-1">Recently Added Books</h3>
            <p className="text-secondary mb-0">Your latest catalog updates at a glance.</p>
          </div>
          <Link to="/pagination" className="btn btn-outline-secondary">
            Browse Pages
          </Link>
        </div>

        {loading ? (
          <p className="mb-0">Loading recent books...</p>
        ) : summary.recentBooks.length ? (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Edition</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentBooks.map((book) => (
                  <tr key={book._id}>
                    <td>{book.book_name}</td>
                    <td>{book.book_author}</td>
                    <td>{book.book_edition}</td>
                    <td>Rs. {book.book_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mb-0">No books found yet. Add your first book to get started.</p>
        )}
      </div>
    </section>
  );
};
