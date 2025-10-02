"use client"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DashboardChart from "@/components/DashboardChart";
import DashboardColorChart from "@/components/DashboardColorChart";
import DonutProgress from "@/components/DonutProgress";
import StatCard from "@/components/StatCard";


export default function DashboardPage() {
	const [userName, setUserName] = useState("");
    const [donutValue, setDonutValue] = useState(0);
    const [donutLabel, setDonutLabel] = useState("");
    const [donutVisible, setDonutVisible] = useState(false);
    const [selectedStatKey, setSelectedStatKey] = useState("");
    const [donutColor, setDonutColor] = useState("#6366f1");

    function handleStatClick(key, value, label, delta) {
        if (typeof delta === "number") {
            setDonutValue(Math.max(0, Math.abs(delta)));
            setDonutLabel(label ? `${label} change` : "");
            setDonutColor(delta >= 0 ? "#10b981" : "#dc2626");
        } else {
            setDonutValue(value);
            setDonutLabel(label);
        }
        setDonutVisible(prev => (key === selectedStatKey ? !prev : true));
        setSelectedStatKey(key);
    }

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
			{/* <p className="hero-subtitle" style={{ marginTop: 8 }}>
				Welcome{userName ? `, ${userName}` : ""} to your dashboard.
			</p> */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginTop: 16 }}>
                <StatCard
                    label="Visitors"
                    value="12,340"
                    delta={5}
                    gradient="linear-gradient(180deg, #6d6efb 0%, #b4b6ff 100%)"
                    onClick={() => handleStatClick("visitors", null, "Visitors", 5)}
                />
                <StatCard
                    label="Views"
                    value="54,210"
                    delta={12}
                    gradient="linear-gradient(180deg, #10b981 0%, #6ee7b7 100%)"
                    onClick={() => handleStatClick("views", null, "Views", 12)}
                />
                <StatCard
                    label="Orders"
                    value="1,287"
                    delta={-3}
                    gradient="linear-gradient(180deg, #f59e0b 0%, #fcd34d 100%)"
                    onClick={() => handleStatClick("orders", null, "Orders", -3)}
                />
                <StatCard
                    label="Conversion"
                    value="3.4%"
                    delta={0.6}
                    gradient="linear-gradient(180deg, #6366f1 0%, #93c5fd 100%)"
                    onClick={() => handleStatClick("conversion", null, "Conversion", 0.6)}
                />
                {donutVisible ? (
                    <div
                        style={{
                            gridColumn: (selectedStatKey === "visitors" ? 1 : selectedStatKey === "views" ? 2 : selectedStatKey === "orders" ? 3 : selectedStatKey === "conversion" ? 4 : 1) + " / span 1",
                            marginTop: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <DonutProgress frameless value={donutValue} label={donutLabel || ""} color={donutColor} />
                    </div>
                ) : null}
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
