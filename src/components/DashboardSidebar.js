"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ href: "/dashboard", label: "Overview" },
	{ href: "/dashboard/orders", label: "Orders" },
	{ href: "/dashboard/profile", label: "Profile" },
	{ href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardSidebar() {
	const pathname = usePathname();
	return (
		<aside className="dashboard-aside">
			<nav className="sidebar">
				{links.map(link => {
					const active = pathname === link.href;
					return (
						<Link key={link.href} href={link.href} className={active ? "active" : ""}>
							{link.label}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
