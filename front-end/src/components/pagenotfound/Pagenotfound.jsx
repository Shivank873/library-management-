import { Link } from 'react-router-dom';

export const Pagenotfound = () => {
  return (
    <section className="container py-5">
      <div className="content-card text-center">
        <p className="eyebrow mb-2">404</p>
        <h2 className="mb-3">Page not found</h2>
        <p className="text-secondary mb-4">
          The page you requested does not exist or may have been moved.
        </p>
        <Link to="/" className="btn btn-dark">
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
};
