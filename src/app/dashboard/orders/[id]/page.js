import Link from "next/link";
import EditInline from "./EditInline";

async function getOrder(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/orders`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data = await res.json();
      const found = (data.orders || []).find((o) => o.id === id);
      if (found) return found;
    }
  } catch {}
  const all = [
    {
      id: "ORD-1001",
      date: "2025-09-10",
      customer: "Alice Johnson",
      email: "alice@example.com",
      total: 129.99,
      status: "Shipped",
      items: [
        { sku: "SKU-1", name: "Wireless Mouse", qty: 1, price: 39.99 },
        { sku: "SKU-2", name: "Keyboard", qty: 1, price: 90.0 },
      ],
    },
    {
      id: "ORD-1002",
      date: "2025-09-12",
      customer: "Bob Smith",
      email: "bob@example.com",
      total: 58.5,
      status: "Processing",
      items: [{ sku: "SKU-3", name: "USB-C Cable", qty: 3, price: 19.5 }],
    },
    {
      id: "ORD-1003",
      date: "2025-09-14",
      customer: "Charlie Rivera",
      email: "charlie@example.com",
      total: 249.0,
      status: "Delivered",
      items: [{ sku: "SKU-4", name: "27 Monitor", qty: 1, price: 249.0 }],
    },
    {
      id: "ORD-1004",
      date: "2025-09-18",
      customer: "Dana Lee",
      email: "dana@example.com",
      total: 89.0,
      status: "Cancelled",
      items: [{ sku: "SKU-5", name: "Laptop Stand", qty: 1, price: 89.0 }],
    },
    {
      id: "ORD-1005",
      date: "2025-09-20",
      customer: "Evan Chen",
      email: "evan@example.com",
      total: 42.75,
      status: "Processing",
      items: [{ sku: "SKU-6", name: "Notebook", qty: 3, price: 14.25 }],
    },
  ];
  return all.find((o) => o.id === id) || null;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

export default async function OrderDetailPage({ params, searchParams }) {
  const { id } = params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <div className="card">
        <h1 className="hero-title" style={{ fontSize: 24 }}>
          Order not found
        </h1>
        <p className="hero-subtitle" style={{ marginTop: 8 }}>
          No order matches id {id}.
        </p>
        <div className="card-actions" style={{ marginTop: 16 }}>
          <Link href="/dashboard/orders" className="btn btn-ghost btn-sm">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div
        className="card-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 className="hero-title" style={{ fontSize: 28 }}>
            Order {order.id}
          </h1>
          <p className="hero-subtitle" style={{ marginTop: 8 }}>
            Placed on {formatDate(order.date)} • Status: {order.status}
          </p>
        </div>
        <div>
          <Link href="/dashboard/orders" className="btn btn-ghost btn-sm">
            Back
          </Link>
        </div>
      </div>

      <div className="card-body" style={{ marginTop: 16 }}>
        {String(searchParams?.edit || "") === "1" && (
          <div className="card" style={{ padding: 12, marginBottom: 16 }}>
            <EditInline id={order.id} firstItem={order.items?.[0]} />
          </div>
        )}
        <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 16 }}>
          <div className="card" style={{ padding: 12 }}>
            <h2 className="card-title">Customer</h2>
            <p className="card-text">{order.customer}</p>
            <p className="card-text">{order.email}</p>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <h2 className="card-title">Summary</h2>
            <p className="card-text">Subtotal: ${order.total.toFixed(2)}</p>
            <p className="card-text">Shipping: $0.00</p>
            <p className="card-text">Total: ${order.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="table-responsive" style={{ marginTop: 16 }}>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.sku}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>${item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
