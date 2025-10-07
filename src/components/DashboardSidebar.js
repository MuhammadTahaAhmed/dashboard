"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const IconDashboard = (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

const IconOrders = (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M3 7h18M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M8 11h8M8 15h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
	</svg>
);

const IconProfile = (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" stroke="currentColor" strokeWidth="1.6"/>
		<path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
	</svg>
);

const IconSettings = (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" stroke="currentColor" strokeWidth="1.6"/>
		<path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.8 1.8 0 0 0 15 19.4l-.2 0a1.8 1.8 0 0 0-1.6 1.22l-.02.06a2 2 0 1 1-3.77-1.36l.02-.06A1.8 1.8 0 0 0 8.6 15l0-.2a1.8 1.8 0 0 0-1.22-1.6l-.06-.02a2 2 0 1 1 1.36-3.77l.06.02A1.8 1.8 0 0 0 9 8.6l.2 0c.76 0 1.43-.45 1.72-1.14l.02-.06a2 2 0 1 1 3.77 1.36l-.02.06c-.29.69-.05 1.48.55 1.96.2.16.44.26.7.26l.06 0c.76 0 1.43.45 1.72 1.14.11.27.17.56.17.86l0 .2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

const IconStores = (
	<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
		<circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
	</svg>
);

const links = [
	{ href: "/dashboard", label: "Dashboard", icon: IconDashboard },
	{ href: "/dashboard/orders", label: "Orders", icon: IconOrders },
	{ href: "/storein", label: "Stores", icon: IconStores },
	{ href: "/dashboard/profile", label: "Profile", icon: IconProfile },
	{ href: "/dashboard/settings", label: "Setting", icon: IconSettings },
];

export default function DashboardSidebar() {
	const pathname = usePathname();
	const [open, setOpen] = useState(true);
	return (
		<aside className={`dashboard-aside ${open ? "expanded" : "collapsed"}`}>
			<div className="sidebar-header">
				<button
					className="sidebar-toggle"
					onClick={() => setOpen(o => !o)}
					aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
					title={open ? "Collapse" : "Expand"}
				>
					<svg className={`toggle-icon ${open ? "" : "rot"}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
			</div>
			<nav className="sidebar">
				{links.map(link => {
					const active = pathname === link.href;
					return (
						<Link key={link.href} href={link.href} className={active ? "active" : ""} title={link.label}>
							<span className="sidebar-icon">{link.icon}</span>
							<span className="sidebar-label">{link.label}</span>
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
