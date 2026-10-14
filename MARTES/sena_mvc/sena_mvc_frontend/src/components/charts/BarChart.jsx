export default function BarChart({ data, color = "#2a78d6", emptyText = "Sin datos para mostrar." }) {
  if (!data || data.length === 0) {
    return <p className="text-muted mb-0">{emptyText}</p>;
  }

  const max = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="d-flex flex-column gap-3">
      {data.map(d => (
        <div key={d.label} title={`${d.label}: ${d.value}`}>
          <div className="d-flex justify-content-between small mb-1">
            <span>{d.label}</span>
            <span className="fw-semibold">{d.value}</span>
          </div>
          <div className="bg-light rounded-pill" style={{ height: 10 }}>
            <div
              className="rounded-pill"
              style={{
                height: 10,
                width: `${Math.max((d.value / max) * 100, d.value > 0 ? 3 : 0)}%`,
                backgroundColor: color,
                transition: "width .3s ease"
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
