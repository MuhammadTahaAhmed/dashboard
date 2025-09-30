import Separator from "@/components/ui/Separator";

export default function OverviewPage() {
	return (
		<div className="card" style={{ padding: 16 }}>
			<div className="grid grid-3">
				<div className="card">
					<h3 className="card-title">About</h3>
					<p className="card-text">Passionate about building inclusive design communities and practical education.</p>
					<div style={{ marginTop: 12 }}>
						<Separator />
						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
							<div>
								<p className="hero-subtitle" style={{ fontSize: 12 }}>Location</p>
								<p>Lagos, Nigeria</p>
							</div>
							<div>
								<p className="hero-subtitle" style={{ fontSize: 12 }}>Languages</p>
								<p>English, Hausa</p>
							</div>
						</div>
					</div>
				</div>
				<div className="card">
					<h3 className="card-title">Highlights</h3>
					<ul style={{ marginTop: 10, display: "grid", gap: 8 }}>
						<li>🏆 Blackbird Design Award 2024</li>
						<li>🎤 Speaker at 10+ conferences</li>
						<li>🤝 Mentored 120+ designers</li>
					</ul>
				</div>
				<div className="card">
					<h3 className="card-title">Links</h3>
					<div style={{ display: "grid", gap: 8, marginTop: 10 }}>
						<a href="#">@barakatullah</a>
						<a href="#">dribbble.com/barakat</a>
						<a href="#">behance.net/barakat</a>
					</div>
				</div>
			</div>
		</div>
	);
}


