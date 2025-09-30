"use client";

import { useEffect, useRef, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/Button";
import Badge from "@/components/ui/Badge";

export default function AvatarEditor({ defaultSrc, name = "Guest" }) {
	const [avatarSrc, setAvatarSrc] = useState(defaultSrc);
	const [open, setOpen] = useState(false);
	const [shareOpen, setShareOpen] = useState(false);
	const [shareStatus, setShareStatus] = useState("");
	const [inputUrl, setInputUrl] = useState("");
	const fileRef = useRef(null);

	useEffect(() => {
		const saved = typeof window !== "undefined" ? window.localStorage.getItem("profile.avatar") : null;
		if (saved) setAvatarSrc(saved);
	}, []);

	function handleChooseFile() {
		fileRef.current?.click();
	}

	function handleFileChange(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const dataUrl = String(reader.result || "");
			setAvatarSrc(dataUrl);
			try { window.localStorage.setItem("profile.avatar", dataUrl); } catch {}
		};
		reader.readAsDataURL(file);
	}

	function applyUrl() {
		if (!inputUrl.trim()) return;
		setAvatarSrc(inputUrl.trim());
		try { window.localStorage.setItem("profile.avatar", inputUrl.trim()); } catch {}
		setInputUrl("");
		setOpen(false);
	}

	async function webShareProfile() {
		try {
			const origin = typeof window !== "undefined" ? window.location.origin : "";
			const url = `${origin}/dashboard/profile/overview`;
			if (typeof navigator !== "undefined" && navigator.share) {
				await navigator.share({ title: `${name}'s profile`, url });
				setShareStatus("Shared via system share");
				setTimeout(() => setShareStatus(""), 1500);
			} else {
				setShareStatus("System share is not available in this browser");
				setTimeout(() => setShareStatus(""), 2000);
			}
		} catch {}
	}

	return (
		<div>
			<div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
				<Avatar src={avatarSrc} alt={name} size={72} />
				<div style={{ flex: 1, minWidth: 220 }}>
					<h1 className="hero-title" style={{ fontSize: 28, lineHeight: 1.1 }}>{name}</h1>
					<p className="hero-subtitle" style={{ marginTop: 6 }}>Design educator • Product thinker • Community builder</p>
					<div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
						<Badge>Mentor</Badge>
						<Badge variant="secondary">Available for work</Badge>
						<Badge variant="outline">Lagos, NG</Badge>
					</div>
				</div>
				<div style={{ display: "flex", gap: 8 }}>
					<Button size="md" onClick={() => setOpen((v) => !v)}>Edit Profile</Button>
					<Button size="md" variant="ghost" onClick={() => setShareOpen((v) => !v)}>Share</Button>
				</div>
			</div>

			{open ? (
				<div className="card" style={{ marginTop: 12, padding: 12, display: "grid", gap: 10 }}>
					<p className="label">Change profile picture</p>
					<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
						<input
							ref={fileRef}
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							style={{ display: "none" }}
						/>
						<Button size="sm" onClick={handleChooseFile}>Upload image</Button>
					</div>
					<div style={{ display: "grid", gap: 8 }}>
						<input className="input" placeholder="Paste image URL (https://...)" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
						<div style={{ display: "flex", gap: 8 }}>
							<Button size="sm" onClick={applyUrl}>Apply URL</Button>
							<Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Close</Button>
						</div>
					</div>
				</div>
			) : null}


			{shareOpen ? (
				<div className="card" style={{ marginTop: 12, padding: 16, display: "grid", gap: 12 }}>
					<div style={{ display: "grid", gap: 4 }}>
						<p className="label">Share</p>
						<p className="hero-subtitle" style={{ fontSize: 13 }}>Send your profile via your device's share sheet.</p>
					</div>
					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
						<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
							<div style={{ width: 36, height: 36, borderRadius: 10, background: "color-mix(in oklab, var(--primary) 16%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid color-mix(in oklab, var(--primary) 30%, transparent)" }}>
								<span style={{ fontSize: 18 }}>📤</span>
							</div>
							<div>
								<p style={{ fontWeight: 700 }}>System Share</p>
								<p className="hero-subtitle" style={{ fontSize: 12 }}>Open native share dialog</p>
							</div>
						</div>
						<Button size="lg" onClick={webShareProfile}>Share</Button>
					</div>
					{shareStatus ? <p className="hero-subtitle" style={{ fontSize: 12 }}>{shareStatus}</p> : null}
				</div>
			) : null}
		</div>
	);
}


