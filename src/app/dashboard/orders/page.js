import Link from "next/link";



import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

import Badge from "@/components/ui/Badge";
import Button from "@/components/Button";
import { Input } from "@/components/ui/input";

export default function OrdersPage() {
	const orders = [
		{ id: "ORD-1001", date: "2025-09-10", customer: "Alice Johnson", total: 129.99, status: "Shipped" },
		{ id: "ORD-1002", date: "2025-09-12", customer: "Bob Smith", total: 58.5, status: "Processing" },
		{ id: "ORD-1003", date: "2025-09-14", customer: "Charlie Rivera", total: 249.0, status: "Delivered" },
		{ id: "ORD-1004", date: "2025-09-18", customer: "Dana Lee", total: 89.0, status: "Cancelled" },
		{ id: "ORD-1005", date: "2025-09-20", customer: "Evan Chen", total: 42.75, status: "Processing" },
	];

	const renderStatus = status => {
		switch (status) {
			case "Delivered":
				return <Badge variant="success">Delivered</Badge>;
			case "Shipped":
				return <Badge variant="info">Shipped</Badge>;
			case "Processing":
				return <Badge variant="warning">Processing</Badge>;
			case "Cancelled":
				return <Badge variant="danger">Cancelled</Badge>;
			default:
				return <Badge>Unknown</Badge>;
		}
	};

	return (
		<div className="card">
			<div className="card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
				<div>
					<h1 className="hero-title" style={{ fontSize: 28 }}>Orders</h1>
					<p className="hero-subtitle" style={{ marginTop: 8 }}>Review and manage your recent orders.</p>
				</div>
				<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
					<Input placeholder="Search orders…" aria-label="Search orders" />
					<Button size="sm" variant="ghost">Export</Button>
					<Link href="/dashboard/orders/new" className="btn btn-primary btn-sm">New order</Link>
				</div>
			</div>

			<div className="card-body" style={{ marginTop: 16 }}>
				{orders.length === 0 ? (
					<div className="empty-state">
						<p>No orders found.</p>
					</div>
				) : (
					<div className="table-responsive">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Order #</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Customer</TableHead>
									<TableHead>Total</TableHead>
									<TableHead>Status</TableHead>
									<TableHead style={{ textAlign: "right" }}>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.map(order => (
									<TableRow key={order.id}>
										<TableCell>{order.id}</TableCell>
										<TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
										<TableCell>{order.customer}</TableCell>
										<TableCell>${order.total.toFixed(2)}</TableCell>
										<TableCell>{renderStatus(order.status)}</TableCell>
										<TableCell style={{ textAlign: "right" }}>
											<Link href={`/dashboard/orders/${order.id}`} className="btn btn-ghost btn-sm">View</Link>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</div>
		</div>
	);
}
