"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewOrderPage() {
	const router = useRouter();
	const [customer, setCustomer] = useState("");
	const [email, setEmail] = useState("");
	const [itemName, setItemName] = useState("");
	const [qty, setQty] = useState(1);
	const [price, setPrice] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setSubmitting(true);
		try {
			const items = [{ sku: `SKU-${Date.now()}`, name: itemName || "Item", qty: Number(qty) || 1, price: Number(price) || 0 }];
			const total = items.reduce((s, it) => s + it.qty * it.price, 0);
			const res = await fetch("/api/orders", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ customer, email, items, total }),
			});
			if (!res.ok) throw new Error("Failed to create order");
			const data = await res.json();
			router.push(`/dashboard/orders/${data.order.id}`);
		} catch (err) {
			setError(err.message || "Something went wrong");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div className="card">
			<div className="card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<h1 className="hero-title" style={{ fontSize: 28 }}>New Order</h1>
			</div>
			<div className="card-body" style={{ marginTop: 16 }}>
				<form onSubmit={handleSubmit} className="grid" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
					<div>
						<label className="label" htmlFor="customer">Customer</label>
						<Input id="customer" placeholder="Customer name" value={customer} onChange={e => setCustomer(e.target.value)} required />
					</div>
					<div>
						<label className="label" htmlFor="email">Email</label>
						<Input id="email" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
					</div>
					<div className="grid" style={{ gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>
						<div>
							<label className="label" htmlFor="item">Item</label>
							<Input id="item" placeholder="Item name" value={itemName} onChange={e => setItemName(e.target.value)} required />
						</div>
						<div>
							<label className="label" htmlFor="qty">Qty</label>
							<Input id="qty" type="number" min={1} value={qty} onChange={e => setQty(e.target.value)} required />
						</div>
						<div>
							<label className="label" htmlFor="price">Price</label>
							<Input id="price" type="number" step="0.01" min={0} value={price} onChange={e => setPrice(e.target.value)} required />
						</div>
					</div>
					{error ? <p className="card-text" style={{ color: "crimson" }}>{error}</p> : null}
					<div className="card-actions" style={{ display: "flex", gap: 8 }}>
						<Button type="submit" disabled={submitting}>{submitting ? "Creating…" : "Create order"}</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

