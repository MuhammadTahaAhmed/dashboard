import Progress from "@/components/ui/Progress";
import AvatarEditor from "./AvatarEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Separator from "@/components/ui/Separator";
import Button from "@/components/Button";
import Avatar from "@/components/ui/Avatar";

export default function ProfilePage() {
	return (
		<div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
			{/* Header with editable avatar */}
			<div className="card" style={{ padding: 20 }}>
				<AvatarEditor
					defaultSrc="https://api.dicebear.com/9.x/avataaars/svg?seed=neo&backgroundType=gradientLinear&accessories=round&hairColor=2c1b18,8d5524,b55239&clothingColor=0ea5e9,38bdf8,1e293b"
					// name={displayName}
				/>
				<div style={{ marginTop: 16 }}>
					<Progress value={72} />
					<p className="hero-subtitle" style={{ fontSize: 13, marginTop: 6 }}>Profile completeness: 72%</p>
				</div>
			</div>

			<div style={{ height: 16 }} />

			{/* Main grid */}
			<div className="dashboard-grid">
				<aside className="dashboard-aside">
					<div className="sidebar">
						<a className="active" href="#overview">Overview</a>
						<a href="#activity">Activity</a>
						<a href="#favorites">Favorites</a>
						<a href="#collabs">Collabs</a>
						<a href="#settings">Settings</a>
					</div>
					<div style={{ marginTop: 24 }}>
						<div className="card" style={{ padding: 16 }}>
							<p className="label" style={{ marginBottom: 10 }}>Event statistics</p>
							<div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
								<div>
									<p className="hero-subtitle" style={{ fontSize: 12 }}>Total</p>
									<p style={{ fontWeight: 800, fontSize: 20 }}>190</p>
								</div>
								<div>
									<p className="hero-subtitle" style={{ fontSize: 12 }}>Attended</p>
									<p style={{ fontWeight: 800, fontSize: 20 }}>86</p>
								</div>
								<div>
									<p className="hero-subtitle" style={{ fontSize: 12 }}>Hosted</p>
									<p style={{ fontWeight: 800, fontSize: 20 }}>14</p>
								</div>

							</div>
						</div>
					</div>
				</aside>
				<section>
					<Tabs defaultValue="overview">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="favorites">Favorites</TabsTrigger>
							<TabsTrigger value="activity">Recent Activity</TabsTrigger>
							<TabsTrigger value="collabs">Collabs</TabsTrigger>
						</TabsList>

						<div className="card" style={{ padding: 16 }}>
							<TabsContent value="overview">
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
							</TabsContent>

							<TabsContent value="favorites">
								<div className="grid grid-3">
									{[1,2,3,4,5,6].map((i) => (
											<div key={i} className="card">
												<div className="card-media" />
												<h3 className="card-title">Favorite #{i}</h3>
												<p className="card-text">Saved session around design leadership and growth.</p>
												<div className="card-actions"><Button size="sm">Open</Button></div>
											</div>
										))}
								</div>
							</TabsContent>

							<TabsContent value="activity">
								<ul style={{ display: "grid", gap: 12 }}>
									{[
										"Saved: Inclusive Leadership Workshop",
										"Commented on: Mental health resources",
										"Joined: Product Design Meetup"
									].map((text, idx) => (
											<li key={idx} className="card" style={{ padding: 14 }}>{text}</li>
										))}
								</ul>
							</TabsContent>

							<TabsContent value="collabs">
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
							</TabsContent>
						</div>
					</Tabs>
				</section>
			</div>
		</div>
	);
}


