export default function DonutChart({ data, size = 160, thickness = 26, emptyText = "Sin datos para mostrar." }) {
  const total = data ? data.reduce((sum, d) => sum + d.value, 0) : 0;

  if (!total) {
    return <p className="text-muted mb-0">{emptyText}</p>;
  }

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let acumulado = 0;

  return (
    <div className="d-flex align-items-center gap-4 flex-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img">
        <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
          {data.map(d => {
            const frac = d.value / total;
            const dash = frac * circumference;
            const gap = circumference - dash;
            const offset = -acumulado * circumference;
            acumulado += frac;
            return (
              <circle
                key={d.label}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={offset}
              >
                <title>{`${d.label}: ${d.value} (${Math.round(frac * 100)}%)`}</title>
              </circle>
            );
          })}
        </g>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="600">
          {total}
        </text>
      </svg>

      <ul className="list-unstyled mb-0 small">
        {data.map(d => (
          <li key={d.label} className="d-flex align-items-center gap-2 mb-1">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: d.color,
                display: "inline-block"
              }}
            />
            {d.label}: <strong>{d.value}</strong> ({Math.round((d.value / total) * 100)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
