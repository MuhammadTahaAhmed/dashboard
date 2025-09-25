"use client";

import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const sampleData = [
	{ name: "Jan", revenue: 4000, orders: 240 },
	{ name: "Feb", revenue: 3000, orders: 221 },
	{ name: "Mar", revenue: 5200, orders: 229 },
	{ name: "Apr", revenue: 4780, orders: 200 },
	{ name: "May", revenue: 5890, orders: 218 },
	{ name: "Jun", revenue: 6390, orders: 250 },
	{ name: "Jul", revenue: 7200, orders: 265 },
];

export default function DashboardChart({ data = sampleData, title = "Revenue vs Orders" }) {
	return (
		<div className="card" style={{ padding: 16 }}>
			<h3 className="card-title" style={{ marginBottom: 12 }}>{title}</h3>
			<div style={{ width: "100%", height: 320 }}>
				<ResponsiveContainer>
					<LineChart data={data} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
						<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
						<XAxis dataKey="name" stroke="#6b7280" />
						<YAxis stroke="#6b7280" />
						<Tooltip cursor={{ stroke: "#9ca3af" }} />
						<Legend />
						<Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={false} name="Revenue" />
						<Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={false} name="Orders" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}


