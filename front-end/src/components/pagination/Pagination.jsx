import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import api from '../../lib/api';

const BOOKS_PER_PAGE = 6;

export const Pagination = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPaginatedBooks = async () => {
      try {
        setLoading(true);
        const response = await api.get('/books', {
          params: {
            page,
            limit: BOOKS_PER_PAGE,
          },
        });

        setBooks(response.data.data);
        setPageCount(response.data.pagination.totalPages);
        setError('');
      } catch (err) {
        setBooks([]);
        setError(err.response?.data?.message || 'Unable to load paginated books.');
      } finally {
        setLoading(false);
      }
    };

    getPaginatedBooks();
  }, [page]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <div className="container py-5">
      <div className="content-card">
        <div className="mb-4">
          <p className="eyebrow mb-2">Browse Collection</p>
          <h3 className="mb-1">Paginated Library View</h3>
          <p className="text-secondary mb-0">
            Review your catalog page by page with the latest books first.
          </p>
        </div>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        <div className="row g-4">
          {loading ? (
            <div className="col-12">
              <p className="mb-0">Loading books...</p>
            </div>
          ) : books.length ? (
            books.map((book) => (
              <div className="col-md-6 col-xl-4" key={book._id}>
                <article className="book-card h-100">
                  <div className="book-card-badge">{book.book_edition}</div>
                  <h4 className="h5 mb-2">{book.book_name}</h4>
                  <p className="text-secondary mb-2">by {book.book_author}</p>
                  <div className="d-flex justify-content-between small text-secondary mb-3">
                    <span>{book.book_page_number} pages</span>
                    <span>Rs. {book.book_price}</span>
                  </div>
                  <p className="mb-0">{book.book_description}</p>
                </article>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="mb-0">No books available.</p>
            </div>
          )}
        </div>

        <div className="mt-4 d-flex justify-content-center">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="pagination mb-0"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
            forcePage={page - 1}
          />
        </div>
      </div>
    </div>
  );
};
