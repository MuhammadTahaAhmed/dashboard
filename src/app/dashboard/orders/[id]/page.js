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
      <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>📦</div>
        <h1 className="hero-title" style={{ fontSize: 28, marginBottom: 12 }}>
          Order Not Found
        </h1>
        <p className="hero-subtitle" style={{ fontSize: 16, marginBottom: 24 }}>
          No order matches ID <span style={{ fontFamily: 'monospace', background: 'var(--surface)', padding: '2px 6px', borderRadius: '4px' }}>{id}</span>
        </p>
        <div>
          <Link href="/dashboard/orders" className="btn btn-primary btn-md">
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const renderStatus = (status) => {
    const statusConfig = {
      "Delivered": { icon: "✓", className: "badge-success", bgColor: "#ecfdf5", textColor: "#065f46" },
      "Shipped": { icon: "🚚", className: "badge-info", bgColor: "#eef2ff", textColor: "#1e3a8a" },
      "Processing": { icon: "⏳", className: "badge-warning", bgColor: "#fff7ed", textColor: "#7c2d12" },
      "Cancelled": { icon: "✕", className: "badge-danger", bgColor: "#fef2f2", textColor: "#7f1d1d" }
    };
    const config = statusConfig[status] || { icon: "?", className: "badge", bgColor: "#f3f4f6", textColor: "#374151" };
    
    return (
      <span 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px',
          padding: '8px 16px',
          borderRadius: '999px',
          fontSize: '14px',
          fontWeight: 600,
          background: config.bgColor,
          color: config.textColor,
          border: `1px solid ${config.textColor}20`
        }}
      >
        <span>{config.icon}</span>
        {status}
      </span>
    );
  };

  const getStatusTimeline = (status) => {
    const steps = ['Processing', 'Shipped', 'Delivered'];
    const currentIndex = steps.indexOf(status);
    const cancelledStatus = status === 'Cancelled';
    
    return steps.map((step, index) => ({
      label: step,
      completed: !cancelledStatus && index <= currentIndex,
      active: !cancelledStatus && index === currentIndex,
      cancelled: cancelledStatus && step === status
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="card-header" style={{ padding: '32px', background: 'linear-gradient(135deg, var(--surface) 0%, color-mix(in oklab, var(--primary) 4%, transparent) 100%)', borderRadius: '16px 16px 0 0' }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <h1 className="hero-title" style={{ fontSize: 32, margin: 0 }}>
                  Order {order.id}
                </h1>
                {renderStatus(order.status)}
              </div>
              <p className="hero-subtitle" style={{ fontSize: 16, margin: 0 }}>
                Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link 
                href={`/dashboard/orders/${order.id}?edit=1`} 
                className="btn btn-ghost btn-sm"
                style={{ display: String(searchParams?.edit || "") === "1" ? 'none' : 'inline-flex' }}
              >
                ✏️ Edit
              </Link>
              <Link href="/dashboard/orders" className="btn btn-primary btn-sm">
                ← Back to Orders
              </Link>
            </div>
          </div>

          {/* Status Timeline */}
          {order.status !== 'Cancelled' && (
            <div style={{ marginTop: '32px', padding: '24px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: '20px', color: 'var(--foreground)' }}>Order Progress</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {getStatusTimeline(order.status).map((step, index) => (
                  <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                      <div 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '50%', 
                          background: step.completed || step.active 
                            ? 'var(--primary)' 
                            : step.cancelled 
                              ? '#ef4444' 
                              : 'var(--border)',
                          color: step.completed || step.active || step.cancelled ? 'white' : 'var(--muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 600,
                          marginBottom: '8px'
                        }}
                      >
                        {step.completed ? '✓' : step.cancelled ? '✕' : index + 1}
                      </div>
                      <span style={{ 
                        fontSize: '12px', 
                        fontWeight: step.active ? 600 : 400,
                        color: step.completed || step.active 
                          ? 'var(--foreground)' 
                          : step.cancelled 
                            ? '#ef4444' 
                            : 'var(--muted)',
                        textAlign: 'center'
                      }}>
                        {step.label}
                      </span>
                    </div>
                    {index < getStatusTimeline(order.status).length - 1 && (
                      <div 
                        style={{ 
                          height: '2px', 
                          flex: 1, 
                          background: step.completed ? 'var(--primary)' : 'var(--border)',
                          marginBottom: '24px',
                          marginLeft: '16px',
                          marginRight: '16px'
                        }} 
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Section */}
      {String(searchParams?.edit || "") === "1" && (
        <div className="card">
          <div className="card-header" style={{ padding: '20px', background: 'color-mix(in oklab, #f59e0b 6%, transparent)', borderRadius: '16px 16px 0 0' }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>✏️ Edit Order</h3>
          </div>
          <div style={{ padding: '20px' }}>
            <EditInline id={order.id} firstItem={order.items?.[0]} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Customer Information */}
        <div className="card">
          <div className="card-header" style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              👤 Customer Information
            </h2>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: '4px' }}>Customer Name</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>{order.customer}</div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: '4px' }}>Email Address</div>
              <div style={{ fontSize: 16, color: 'var(--primary)' }}>{order.email}</div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card">
          <div className="card-header" style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              💰 Order Summary
            </h2>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: 'var(--muted)' }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>${order.total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: 'var(--muted)' }}>Shipping</span>
              <span style={{ fontWeight: 600, color: '#10b981' }}>FREE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: 'var(--muted)' }}>Tax</span>
              <span style={{ fontWeight: 600 }}>$0.00</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="card">
        <div className="card-header" style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            📦 Order Items ({order.items.length})
          </h2>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gap: '16px' }}>
            {order.items.map((item, index) => (
              <div 
                key={item.sku} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: 'color-mix(in oklab, var(--foreground) 2%, transparent)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <div 
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '8px', 
                      background: 'var(--primary)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: 600
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'monospace' }}>SKU: {item.sku}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: '2px' }}>Quantity</div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{item.qty}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: '2px' }}>Unit Price</div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>${item.price.toFixed(2)}</div>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: '80px' }}>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: '2px' }}>Total</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>
                      ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
