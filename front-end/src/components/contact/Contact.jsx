export const Contact = () => {
  return (
    <section className="container py-5">
      <div className="content-card">
        <p className="eyebrow mb-2">Contact</p>
        <h2 className="mb-3">Need help with the catalog?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="stat-card">
              <p className="stat-label">Email</p>
              <p className="mb-0">support@library.com</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <p className="stat-label">Phone</p>
              <p className="mb-0">+91 9876543210</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <p className="stat-label">Address</p>
              <p className="mb-0">BBD Campus, Lucknow, Uttar Pradesh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
