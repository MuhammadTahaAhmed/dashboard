const orders = globalThis.__orders || (globalThis.__orders = new Map());

function newId() {
	// Simple unique id
	const n = (orders.size + 1001).toString().padStart(4, "0");
	return `ORD-${n}`;
}

export async function POST(request) {
	const data = await request.json();
	const id = newId();
	const order = {
		id,
		date: new Date().toISOString(),
		customer: String(data.customer || "").trim(),
		email: String(data.email || "").trim(),
		items: Array.isArray(data.items) ? data.items : [],
		total: Number(data.total || 0),
		status: "Processing",
	};
	orders.set(id, order);
	return new Response(JSON.stringify({ ok: true, order }), { status: 200, headers: { "content-type": "application/json" } });
}

export async function GET() {
	// Return list ordered by most recent
	const list = Array.from(orders.values()).sort((a, b) => new Date(b.date) - new Date(a.date));
	return new Response(JSON.stringify({ ok: true, orders: list }), { status: 200, headers: { "content-type": "application/json" } });
}

