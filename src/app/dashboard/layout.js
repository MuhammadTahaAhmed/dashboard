import DashboardSidebar from "components/DashboardSidebar";

export const metadata = {
	title: "Dashboard",
};

export default function DashboardLayout({ children }) {
	return (
		<section className="section">
			<div className="container section-inner dashboard-grid">
				<DashboardSidebar />
				<div>{children}</div>
			</div>
		</section>
	);
}
