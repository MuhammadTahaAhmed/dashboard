import Separator from "@/components/ui/Separator";

export default function ProfilePage() {
	return (
        <div className="card" style={{ padding: 8 }}>
            <h3 className="card-title">Store Description</h3>
            <p className="card-text" style={{ marginTop: 5 }}>
                Welcome to our e‑commerce store—your destination for curated products, secure checkout,
                and fast, reliable delivery. We focus on quality, transparent pricing, and responsive
                support so you can shop with confidence.
            </p>
            <div style={{ marginTop: 8 }}>
                <Separator />
                <div style={{ display: "grid", gap: 8, marginTop: 5 }}>
                    <p className="hero-subtitle" style={{ fontSize: 15,  }}>Why shop with us</p>
					<ul style={{ display: "grid", gap: 6, listStyle: "none", padding: 0, margin: 0 }}>
						<li style={{ display: "grid", gridTemplateColumns: "20px 1fr", alignItems: "center", columnGap: 8, minHeight: 28 }}>
							<span aria-hidden style={{ width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>🔒</span>
							<span style={{ lineHeight: 1.4 }}>Secure payments and data protection</span>
						</li>
						<li style={{ display: "grid", gridTemplateColumns: "20px 1fr", alignItems: "center", columnGap: 8, minHeight: 28 }}>
							<span aria-hidden style={{ width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>⚡</span>
							<span style={{ lineHeight: 1.4 }}>Fast shipping and real‑time order tracking</span>
						</li>
						<li style={{ display: "grid", gridTemplateColumns: "20px 1fr", alignItems: "center", columnGap: 8, minHeight: 28 }}>
							<span aria-hidden style={{ width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>🛠️</span>
							<span style={{ lineHeight: 1.4 }}>Hassle‑free returns and dedicated support</span>
						</li>
					</ul>
                </div>
            </div>
        </div>
	);
}


