export default function ActivityPage() {
	return (
		<div className="card" style={{ padding: 16 }}>
			<ul style={{ display: "grid", gap: 12, listStyle: "none"}}>
				{[
					"Saved: Inclusive Leadership Workshop",
					"Commented on: Mental health resources",
					"Joined: Product Design Meetup"
				].map((text, idx) => (
						<li key={idx} className="card" style={{ padding: 14 }}>{text}</li>
					))}
			</ul>
		</div>
	);
}


