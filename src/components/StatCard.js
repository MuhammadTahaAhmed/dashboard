export default function StatCard({ label, value, delta, icon = null }) {
	return (
		<div className="card" style={{ padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
			{icon ? <div style={{ fontSize: 20 }}>{icon}</div> : null}
			<div style={{ flex: 1 }}>
				<div className="card-title" style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{label}</div>
				<div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
					<div style={{ fontSize: 24, fontWeight: 600 }}>{value}</div>
					{delta != null ? (
						<span style={{ fontSize: 12, color: delta >= 0 ? "#059669" : "#dc2626" }}>
							{delta >= 0 ? "+" : ""}{delta}%
						</span>
					) : null}
				</div>
			</div>
		</div>
	);
}


