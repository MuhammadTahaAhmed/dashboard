import Button from "@/components/Button";
import Avatar from "@/components/ui/Avatar";

export default function CollabsPage() {
	return (
		<div className="card" style={{ padding: 16 }}>
			<div className="grid grid-3">
				{["WB Team","Black & Pink Crew","Minds Care"].map((name, i) => (
						<div key={i} className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
								<Avatar size={36} />
								<div>
									<p style={{ fontWeight: 700 }}>{name}</p>
									<p className="hero-subtitle" style={{ fontSize: 12 }}>7 members</p>
								</div>
							</div>
							<Button size="sm">View</Button>
						</div>
					))}
			</div>
		</div>
	);
}


