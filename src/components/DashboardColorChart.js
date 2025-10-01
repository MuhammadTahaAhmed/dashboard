"use client";

import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const sampleData = [
	{ name: "Jan", revenue: 4000, orders: 240, refunds: 12 },
	{ name: "Feb", revenue: 3000, orders: 221, refunds: 15 },
	{ name: "Mar", revenue: 5200, orders: 229, refunds: 10 },
	{ name: "Apr", revenue: 4780, orders: 200, refunds: 18 },
	{ name: "May", revenue: 5890, orders: 218, refunds: 9 },
	{ name: "Jun", revenue: 6390, orders: 250, refunds: 11 },
	{ name: "Jul", revenue: 7200, orders: 265, refunds: 8 },
];

export default function DashboardColorChart({ data = sampleData, title = "Monthly Overview", height = 360, frameless = false }) {
	const content = (
		<>
			<h3 className="card-title" style={{ marginBottom: 12 }}>{title}</h3>
			<div style={{ width: "100%", height }}>
				<ResponsiveContainer>
					<BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
						<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
						<XAxis dataKey="name" stroke="#6b7280" />
						<YAxis stroke="#6b7280" />
						<Tooltip cursor={{ fill: "#f3f4f6" }} />
						<Legend />
						<defs>
							<linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
								<stop offset="100%" stopColor="#6366f1" stopOpacity={0.5} />
							</linearGradient>
							<linearGradient id="gradOrders" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
								<stop offset="100%" stopColor="#10b981" stopOpacity={0.5} />
							</linearGradient>
							<linearGradient id="gradRefunds" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
								<stop offset="100%" stopColor="#f59e0b" stopOpacity={0.5} />
							</linearGradient>
						</defs>
						<Bar dataKey="revenue" name="Revenue" fill="url(#gradRevenue)" radius={[6,6,0,0]} />
						<Bar dataKey="orders" name="Orders" fill="url(#gradOrders)" radius={[6,6,0,0]} />
						<Bar dataKey="refunds" name="Refunds" fill="url(#gradRefunds)" radius={[6,6,0,0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</>
	);
	if (frameless) return content;
	return (
		<div className="card" style={{ padding: 16 }}>
			{content}
		</div>
	);
}


