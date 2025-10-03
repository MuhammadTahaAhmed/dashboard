"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState(null);
	const [loadingUser, setLoadingUser] = useState(true);
	const [theme, setTheme] = useState("system");

	useEffect(() => {
		let ignore = false;
		async function load() {
			try {
				const res = await fetch("/api/auth/session", { cache: "no-store" });
				const data = await res.json();
				if (!ignore) setUser(data.user || null);
			} catch {}
			setLoadingUser(false);
		}
		load();
		return () => { ignore = true; };
	}, []);

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => { document.body.style.overflow = ""; };
	}, [open]);

	// Theme initialize and apply
	useEffect(() => {
		// Read stored preference or respect system
		let stored = "";
		try { stored = localStorage.getItem("theme") || ""; } catch {}
		const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initial = stored === "light" || stored === "dark" ? stored : (prefersDark ? "dark" : "light");
		setTheme(initial);
		const root = document.documentElement;
		if (initial === "dark") root.classList.add("dark"); else root.classList.remove("dark");
	}, []);

	function toggleTheme() {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		try { localStorage.setItem("theme", next); } catch {}
		const root = document.documentElement;
		if (next === "dark") root.classList.add("dark"); else root.classList.remove("dark");
	}

	async function onLogout() {
		await fetch("/api/auth/logout", { method: "POST" });
		setUser(null);
		setOpen(false);
	}

	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header-inner">
                        <Link href="/" className="brand" style={{
                            background: "linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent"
                        }}>E-Commerce</Link>
						<nav className="nav">
							<Link href="/">Home</Link>
							<Link href="/about">About</Link>
							<Link href="/services">Services</Link>
							<Link href="/contact">Contact</Link>
						<button onClick={toggleTheme} className="btn btn-sm btn-ghost" aria-label="Toggle theme">
							{theme === "dark" ? (
								// Sun icon (switch to light)
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
									<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							) : (
								// Moon icon (switch to dark)
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							)}
						</button>
							{loadingUser ? null : user ? (
								<>
									<Link href="/dashboard">Dashboard</Link>
									<button onClick={onLogout} className="btn btn-sm btn-ghost">Logout</button>
								</>
							) : null}
						</nav>
						<button aria-label="Open Menu" onClick={() => setOpen(true)} className="menu-btn">
							<svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</button>
					</div>
				</div>
			</header>

			{/* Drawer Overlay */}
			<div className={`drawer-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />

			{/* Drawer Panel */}
			<aside className={`drawer ${open ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Mobile Menu">
				<div className="drawer-header">
					<span style={{ fontWeight: 700 }}>Menu</span>
					<button aria-label="Close Menu" className="drawer-close" onClick={() => setOpen(false)}>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</button>
				</div>
				<nav className="drawer-links">
					<Link href="/" onClick={() => setOpen(false)}>Home</Link>
					<Link href="/about" onClick={() => setOpen(false)}>About</Link>
					<Link href="/services" onClick={() => setOpen(false)}>Services</Link>
					<Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
					<button onClick={() => { toggleTheme(); setOpen(false); }} className="btn btn-sm btn-ghost" aria-label="Toggle theme">
						{theme === "dark" ? (
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
								<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
							</svg>
						) : (
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						)}
					</button>
					{loadingUser ? null : user ? (
						<>
							<Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
							<button onClick={onLogout} className="btn btn-sm btn-ghost">Logout</button>
						</>
					) : null}
				</nav>
			</aside>
		</>
	);
}
