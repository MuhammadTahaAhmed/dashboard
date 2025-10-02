import AvatarEditor from "./AvatarEditor";

export default function ProfileLayout({ children }) {
	return (
		<div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
			<div className="card" style={{ padding: 20 }}>
				<AvatarEditor
					defaultSrc="https://api.dicebear.com/9.x/avataaars/svg?seed=neo&backgroundType=gradientLinear&accessories=round&hairColor=2c1b18,8d5524,b55239&clothingColor=0ea5e9,38bdf8,1e293b"
					name="Guest"
				/>
			</div>

			<div style={{ height: 16 }} />

			<div className="dashboard-grid">
				<aside className="dashboard-aside">
					<div className="sidebar">
						<a href="/dashboard/profile/overview">Overview</a>
						<a href="/dashboard/profile/activity">Activity</a>
						<a href="/dashboard/profile/favorites">Favorites</a>
						<a href="/dashboard/profile/collabs">Collabs</a>
					</div>
				</aside>
				<section>
					{children}
				</section>
			</div>
		</div>
	);
}


