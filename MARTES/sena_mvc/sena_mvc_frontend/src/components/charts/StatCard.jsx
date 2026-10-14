export default function StatCard({ label, value, icon, color = "primary" }) {
  return (
    <div className="col-6 col-md-3">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex align-items-center gap-3">
          <div className={`fs-2 text-${color}`}>{icon}</div>
          <div>
            <div className="text-muted small">{label}</div>
            <div className="fs-3 fw-bold">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
