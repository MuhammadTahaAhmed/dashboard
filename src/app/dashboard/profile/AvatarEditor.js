"use client";

import { useEffect, useRef, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/Button";
import Badge from "src/components/ui/badge";

export default function AvatarEditor({ defaultSrc, name = "Guest" }) {
	const [avatarSrc, setAvatarSrc] = useState(defaultSrc);
	const [open, setOpen] = useState(false);
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
					<Button size="md" variant="ghost">Share</Button>
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
		</div>
	);
}


