export default function StatCard({ label, value, delta, icon = null, onClick, gradient, textColor }) {
    const clickable = typeof onClick === "function";
    const withGradient = typeof gradient === "string" && gradient.length > 0;
    const foreground = withGradient ? (textColor || "#ffffff") : undefined;
    const deltaColor = withGradient
        ? (delta >= 0 ? "#d1fae5" : "#ffffff")
        : (delta >= 0 ? "#059669" : "#dc2626");
    return (
        <div
            className="card"
            style={{
                padding: 16,
                display: "flex",
                gap: 12,
                alignItems: "center",
                cursor: clickable ? "pointer" : "default",
                background: withGradient ? gradient : undefined,
                color: foreground,
            }}
            onClick={onClick}
            role={clickable ? "button" : undefined}
            tabIndex={clickable ? 0 : undefined}
            onKeyDown={clickable ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
        >
			{icon ? <div style={{ fontSize: 20 }}>{icon}</div> : null}
			<div style={{ flex: 1 }}>
                <div className="card-title" style={{ fontSize: 12, color: withGradient ? "rgba(255,255,255,0.85)" : "#6b7280", marginBottom: 4 }}>{label}</div>
				<div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <div style={{ fontSize: 24, fontWeight: 600 }}>{value}</div>
                    {delta != null ? (
                        <span style={{ fontSize: 12, fontWeight: 600, color: deltaColor, textShadow: withGradient ? "0 1px 1px rgba(0,0,0,0.15)" : undefined }}>
							{delta >= 0 ? "+" : ""}{delta}%
						</span>
					) : null}
				</div>
			</div>
		</div>
	);
}


