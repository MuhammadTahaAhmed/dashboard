"use client";
import Button from "@/components/Button";
import Avatar from "@/components/ui/Avatar";
import { useState } from "react";

export default function CollabsPage() {
	const collabs = [
		{
			name: "WB Team",
			members: 12,
			img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=60",
			desc: "Designing wellbeing programs for remote teams.",
			cta: "Weekly sync notes and resources.",
		},
		{
			name: "Black & Pink Crew",
			members: 7,
			img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=60",
			desc: "Community-led mentorship for junior designers.",
			cta: "Portfolio reviews every Friday.",
		},
		{
			name: "Minds Care",
			members: 9,
			img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=60",
			desc: "Mental health awareness and design advocacy.",
			cta: "Monthly wellness workshops.",
		},
	];

	const [openIndex, setOpenIndex] = useState(null);

	function handleView(i) {
		setOpenIndex((p) => (p === i ? null : i));
	}

	return (
		<div className="card" style={{ padding: 16 }}>
			<div className="grid grid-3" style={{ alignItems: "stretch" }}>
				{collabs.map((c, i) => (
						<div key={i} className="card" style={{ height: "100%", display: "grid", gap: 10, gridTemplateRows: "auto auto auto 1fr auto" }}>
							<div className="card-media" style={{ backgroundImage: `url(${c.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
							<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
								<Avatar size={36} />
								<div>
									<p style={{ fontWeight: 700 }}>{c.name}</p>
									<p className="hero-subtitle" style={{ fontSize: 12 }}>{c.members} members</p>
								</div>
							</div>
							<p className="card-text">{c.desc}</p>
							{openIndex === i ? (
								<p className="hero-subtitle" style={{ fontSize: 13 }}>{c.cta}</p>
							) : null}
							<div className="card-actions" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignSelf: "end" }}>
								<Button size="sm" onClick={() => handleView(i)}>{openIndex === i ? "Hide" : "View"}</Button>
								<a href="#" className="hero-subtitle" style={{ fontSize: 12 }}>Learn more</a>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}



