"use client"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DashboardChart from "@/components/DashboardChart";
import DashboardColorChart from "@/components/DashboardColorChart";
import StatCard from "@/components/StatCard";

// const DashboardChart = dynamic(() => import("components/DashboardChart"), { ssr: false });

export default function DashboardPage() {
	const [userName, setUserName] = useState("");

	useEffect(() => {
		let isMounted = true;
		fetch("/api/auth/session")
			.then(r => r.json())
			.then(d => {
				if (!isMounted) return;
				setUserName(d?.user?.name || "");
			})
			.catch(() => {});
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="card" style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <h1 className="hero-title" style={{ fontSize: 28 }}>Dashboard</h1>
            </div>
			<p className="hero-subtitle" style={{ marginTop: 8 }}>
				Welcome{userName ? `, ${userName}` : ""} to your dashboard.
			</p>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginTop: 16 }}>
				<StatCard label="Visitors" value="12,340" delta={5} />
				<StatCard label="Views" value="54,210" delta={12} />
				<StatCard label="Orders" value="1,287" delta={-3} />
				<StatCard label="Conversion" value="3.4%" delta={0.6} />
			</div>
            <div className="card" style={{ padding: 16, marginTop: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
                    <div>
                        <DashboardChart frameless height={300} />
                    </div>
                    <div>
                        <DashboardColorChart frameless height={300} />
                    </div>
                </div>
            </div>
		</div>
	);
}
