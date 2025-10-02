const orders = globalThis.__orders || (globalThis.__orders = new Map());

function newId() {
	// Simple unique id
	const n = (orders.size + 1001).toString().padStart(4, "0");
	return `ORD-${n}`;
}

function seedDemoIfEmpty() {
    if (orders.size > 0) return;
    const demo = [
        { id: "ORD-1001", date: "2025-09-10", customer: "Alice Johnson", email: "alice@example.com", total: 129.99, status: "Shipped", items: [
            { sku: "SKU-1", name: "Wireless Mouse", qty: 1, price: 39.99 },
            { sku: "SKU-2", name: "Keyboard", qty: 1, price: 90.00 },
        ]},
        { id: "ORD-1002", date: "2025-09-12", customer: "Bob Smith", email: "bob@example.com", total: 58.50, status: "Processing", items: [
            { sku: "SKU-3", name: "USB-C Cable", qty: 3, price: 19.50 },
        ]},
        { id: "ORD-1003", date: "2025-09-14", customer: "Charlie Rivera", email: "charlie@example.com", total: 249.00, status: "Delivered", items: [
            { sku: "SKU-4", name: "27 Monitor", qty: 1, price: 249.00 },
        ]},
        { id: "ORD-1004", date: "2025-09-18", customer: "Dana Lee", email: "dana@example.com", total: 89.00, status: "Cancelled", items: [
            { sku: "SKU-5", name: "Laptop Stand", qty: 1, price: 89.00 },
        ]},
        { id: "ORD-1005", date: "2025-09-20", customer: "Evan Chen", email: "evan@example.com", total: 42.75, status: "Processing", items: [
            { sku: "SKU-6", name: "Notebook", qty: 3, price: 14.25 },
        ]},
    ];
    for (const o of demo) {
        orders.set(o.id, o);
    }
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
    seedDemoIfEmpty();
	// Return list ordered by most recent
	const list = Array.from(orders.values()).sort((a, b) => new Date(b.date) - new Date(a.date));
	return new Response(JSON.stringify({ ok: true, orders: list }), { status: 200, headers: { "content-type": "application/json" } });
}

export async function DELETE(request) {
    seedDemoIfEmpty();
    try {
        const contentType = request.headers.get("content-type") || "";
        let body = {};
        if (contentType.includes("application/json")) {
            body = await request.json();
        } else {
            try {
                const formData = await request.formData();
                body = Object.fromEntries(formData.entries());
            } catch {}
        }

        const id = String(body.id || "").trim();
        if (!id) {
            return new Response(JSON.stringify({ ok: false, error: "Missing order id" }), { status: 400, headers: { "content-type": "application/json" } });
        }

        // Idempotent delete: succeed even if the order doesn't exist
        if (orders.has(id)) {
            orders.delete(id);
        }
        return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
    } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: "Failed to delete order" }), { status: 500, headers: { "content-type": "application/json" } });
    }
}

export async function PUT(request) {
    seedDemoIfEmpty();
    try {
        const contentType = request.headers.get("content-type") || "";
        let body = {};
        if (contentType.includes("application/json")) {
            body = await request.json();
        } else {
            const formData = await request.formData();
            body = Object.fromEntries(formData.entries());
        }

        const id = String(body.id || "").trim();
        const qty = Number(body.qty);
        const price = Number(body.price);

        if (!id || Number.isNaN(qty) || Number.isNaN(price)) {
            return new Response(JSON.stringify({ ok: false, error: "Missing or invalid fields" }), { status: 400, headers: { "content-type": "application/json" } });
        }
        const order = orders.get(id);
        if (!order) {
            return new Response(JSON.stringify({ ok: false, error: "Order not found" }), { status: 404, headers: { "content-type": "application/json" } });
        }

        // Update the first item for demo purposes
        if (!Array.isArray(order.items) || order.items.length === 0) {
            order.items = [{ sku: `SKU-${Date.now()}`, name: "Item", qty, price }];
        } else {
            order.items[0] = { ...order.items[0], qty, price };
        }
        order.total = order.items.reduce((s, it) => s + Number(it.qty) * Number(it.price), 0);
        orders.set(id, order);

        return new Response(JSON.stringify({ ok: true, order }), { status: 200, headers: { "content-type": "application/json" } });
    } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: "Failed to update order" }), { status: 500, headers: { "content-type": "application/json" } });
    }
}

