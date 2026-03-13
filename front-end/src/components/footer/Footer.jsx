import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-5">
            <h5>About the library</h5>
            <p className="mb-0 text-footer">
              A practical library management workspace for tracking books, keeping catalog
              details current, and helping teams manage collections with less manual work.
            </p>
          </div>

          <div className="col-md-3">
            <h5>Quick Links</h5>
            <div className="d-flex flex-column gap-2">
              <Link to="/" className="footer-link">
                Dashboard
              </Link>
              <Link to="/book-details" className="footer-link">
                Book Details
              </Link>
              <Link to="/add-book" className="footer-link">
                Add Book
              </Link>
            </div>
          </div>

          <div className="col-md-4">
            <h5>Contact</h5>
            <p className="mb-0 text-footer">
              Email: support@library.com
              <br />
              Phone: +91 9876543210
              <br />
              Address: BBD Campus, Lucknow, UP
            </p>
          </div>
        </div>
        <hr className="border-light-subtle my-4" />
        <p className="mb-0 text-center text-footer">
          Copyright 2026 Library Management. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
