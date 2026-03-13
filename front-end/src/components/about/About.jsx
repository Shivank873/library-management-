export const About = () => {
  return (
    <section className="container py-5">
      <div className="content-card">
        <p className="eyebrow mb-2">About</p>
        <h2 className="mb-3">Built for practical library management</h2>
        <p className="text-secondary mb-3">
          This app helps a team capture accurate book records, browse the collection, and
          keep edits synchronized through a simple full-stack workflow.
        </p>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="stat-card">
              <p className="stat-label">Cataloging</p>
              <p className="mb-0">Add complete book metadata with validation-backed forms.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <p className="stat-label">Operations</p>
              <p className="mb-0">Update or remove titles quickly from a searchable table.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <p className="stat-label">Visibility</p>
              <p className="mb-0">Use the dashboard and pagination views to review collection health.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
