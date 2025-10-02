"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewOrderPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "", qty: 1, price: 0, sku: "" }
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: Customer Info, 2: Items, 3: Review

  // Calculate totals
  const orderCalculations = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      return sum + (Number(item.qty) || 0) * (Number(item.price) || 0);
    }, 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + tax + shipping;
    
    return { subtotal, tax, shipping, total };
  }, [items]);

  // Item management functions
  function addItem() {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    setItems([...items, { id: newId, name: "", qty: 1, price: 0, sku: "" }]);
  }

  function removeItem(id) {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  }

  function updateItem(id, field, value) {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  }

  // Validation functions
  function validateCustomerInfo() {
    return customer.trim() && email.trim() && /\S+@\S+\.\S+/.test(email);
  }

  function validateItems() {
    return items.every(item => 
      item.name.trim() && 
      Number(item.qty) > 0 && 
      Number(item.price) >= 0
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    
    try {
      const orderItems = items.map(item => ({
        sku: item.sku || `SKU-${Date.now()}-${item.id}`,
        name: item.name.trim(),
        qty: Number(item.qty),
        price: Number(item.price),
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ 
          customer: customer.trim(), 
          email: email.trim(), 
          items: orderItems, 
          total: orderCalculations.total 
        }),
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
    <div className="space-y-6">
      {/* Header */}
    <div className="card">
        <div className="card-header" style={{ padding: '32px', background: 'linear-gradient(135deg, var(--surface) 0%, color-mix(in oklab, var(--primary) 4%, transparent) 100%)', borderRadius: '16px 16px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <h1 className="hero-title" style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
                Create New Order
              </h1>
              <p className="hero-subtitle" style={{ fontSize: 16, marginBottom: 0 }}>
                Add customer information and order items
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Link href="/dashboard/orders" className="btn btn-ghost btn-sm">
                ← Cancel
              </Link>
            </div>
          </div>

          {/* Progress Steps */}
          <div style={{ marginTop: '32px', padding: '20px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {[
                { num: 1, label: 'Customer Info', active: step === 1, completed: step > 1 },
                { num: 2, label: 'Order Items', active: step === 2, completed: step > 2 },
                { num: 3, label: 'Review & Submit', active: step === 3, completed: false }
              ].map((stepInfo, index) => (
                <div key={stepInfo.num} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div 
        style={{
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        background: stepInfo.completed 
                          ? 'var(--primary)' 
                          : stepInfo.active 
                            ? 'var(--primary)' 
                            : 'var(--border)',
                        color: stepInfo.active || stepInfo.completed ? 'white' : 'var(--muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        marginBottom: '8px'
                      }}
                    >
                      {stepInfo.completed ? '✓' : stepInfo.num}
                    </div>
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: stepInfo.active ? 600 : 400,
                      color: stepInfo.active || stepInfo.completed ? 'var(--foreground)' : 'var(--muted)',
                      textAlign: 'center'
                    }}>
                      {stepInfo.label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div 
                      style={{ 
                        height: '2px', 
                        flex: 1, 
                        background: stepInfo.completed ? 'var(--primary)' : 'var(--border)',
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
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Main Form */}
        <div className="card">
          <div style={{ padding: '24px' }}>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Customer Information */}
              {step === 1 && (
                <div style={{ display: 'grid', gap: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      👤 Customer Information
                    </h2>
                    <div style={{ display: 'grid', gap: '16px' }}>
          <div>
                        <label className="label" htmlFor="customer" style={{ marginBottom: 8, fontWeight: 600 }}>
                          Customer Name *
            </label>
            <Input
              id="customer"
                          placeholder="Enter customer full name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
                          style={{ fontSize: '16px', padding: '12px 16px' }}
            />
          </div>
          <div>
                        <label className="label" htmlFor="email" style={{ marginBottom: 8, fontWeight: 600 }}>
                          Email Address *
            </label>
            <Input
              id="email"
              type="email"
                          placeholder="customer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                          style={{ fontSize: '16px', padding: '12px 16px' }}
                        />
                        {email && !/\S+@\S+\.\S+/.test(email) && (
                          <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                            Please enter a valid email address
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    <Button 
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!validateCustomerInfo()}
                      style={{ background: 'var(--primary)', color: 'white', padding: '12px 24px' }}
                    >
                      Next: Add Items →
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Order Items */}
              {step === 2 && (
                <div style={{ display: 'grid', gap: '24px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                      <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📦 Order Items ({items.length})
                      </h2>
                      <Button 
                        type="button" 
                        onClick={addItem}
                        size="sm"
                        variant="ghost"
                        style={{ fontSize: '14px' }}
                      >
                        + Add Item
                      </Button>
          </div>
                    
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {items.map((item, index) => (
                        <div 
                          key={item.id} 
                          style={{ 
                            padding: '20px',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            background: 'color-mix(in oklab, var(--foreground) 2%, transparent)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
                              Item #{index + 1}
                            </h3>
                            {items.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                style={{
                                  background: 'color-mix(in oklab, #ef4444 10%, transparent)',
                                  color: '#ef4444',
                                  border: '1px solid color-mix(in oklab, #ef4444 20%, transparent)',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  fontSize: '12px',
                                  cursor: 'pointer'
                                }}
                              >
                                🗑️ Remove
                              </button>
                            )}
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
            <div>
                              <label className="label" style={{ marginBottom: 6, fontWeight: 600 }}>
                                Item Name *
              </label>
              <Input
                                placeholder="Enter item name"
                                value={item.name}
                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
                              <label className="label" style={{ marginBottom: 6, fontWeight: 600 }}>
                                Quantity *
              </label>
              <Input
                type="number"
                min={1}
                                value={item.qty}
                                onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                                style={{ fontSize: '14px' }}
              />
            </div>
            <div>
                              <label className="label" style={{ marginBottom: 6, fontWeight: 600 }}>
                                Price ($) *
              </label>
						<Input
							type="number"
                                step="0.01"
							min={0}
                                value={item.price}
                                onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                                style={{ fontSize: '14px' }}
                              />
                            </div>
                          </div>
                          
                          <div style={{ marginTop: '12px', padding: '8px 12px', background: 'var(--surface)', borderRadius: '6px', fontSize: '14px', fontWeight: 600 }}>
                            Subtotal: ${((Number(item.qty) || 0) * (Number(item.price) || 0)).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    <Button 
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </Button>
                    <Button 
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!validateItems()}
                      style={{ background: 'var(--primary)', color: 'white', padding: '12px 24px' }}
                    >
                      Next: Review Order →
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {step === 3 && (
                <div style={{ display: 'grid', gap: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      📋 Order Review
                    </h2>
                    
                    {/* Customer Review */}
                    <div style={{ padding: '16px', background: 'color-mix(in oklab, var(--foreground) 2%, transparent)', borderRadius: '12px', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Customer Information</h3>
                      <div style={{ fontSize: 14, color: 'var(--muted)' }}>
                        <p><strong>Name:</strong> {customer}</p>
                        <p><strong>Email:</strong> {email}</p>
                      </div>
                    </div>
                    
                    {/* Items Review */}
                    <div style={{ padding: '16px', background: 'color-mix(in oklab, var(--foreground) 2%, transparent)', borderRadius: '12px' }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Order Items ({items.length})</h3>
                      <div style={{ display: 'grid', gap: '8px' }}>
                        {items.map((item, index) => (
                          <div 
                            key={item.id}
                            style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              padding: '8px 0',
                              borderBottom: index < items.length - 1 ? '1px solid var(--border)' : 'none'
                            }}
                          >
                            <div>
                              <span style={{ fontWeight: 600 }}>{item.name}</span>
                              <span style={{ color: 'var(--muted)', marginLeft: '8px' }}>
                                × {item.qty}
                              </span>
                            </div>
                            <span style={{ fontWeight: 600 }}>
                              ${((Number(item.qty) || 0) * (Number(item.price) || 0)).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div style={{ 
                      padding: '12px 16px', 
                      background: 'color-mix(in oklab, #ef4444 10%, transparent)', 
                      color: '#ef4444',
                      borderRadius: '8px',
                      border: '1px solid color-mix(in oklab, #ef4444 20%, transparent)'
                    }}>
                      {error}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                    <Button 
                      type="button"
                      variant="ghost"
                      onClick={() => setStep(2)}
                      disabled={submitting}
                    >
                      ← Back to Items
                    </Button>
                    <Button 
                      type="submit"
                      disabled={submitting || !validateCustomerInfo() || !validateItems()}
                      style={{ background: 'var(--primary)', color: 'white', padding: '12px 24px' }}
                    >
                      {submitting ? 'Creating Order...' : `Create Order ($${orderCalculations.total.toFixed(2)})`}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="card" style={{ alignSelf: 'flex-start', position: 'sticky', top: '20px' }}>
          <div className="card-header" style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              💰 Order Summary
            </h3>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--muted)' }}>Items ({items.length})</span>
                <span style={{ fontWeight: 600 }}>${orderCalculations.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--muted)' }}>Tax (10%)</span>
                <span style={{ fontWeight: 600 }}>${orderCalculations.tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--muted)' }}>Shipping</span>
                <span style={{ fontWeight: 600, color: orderCalculations.shipping === 0 ? '#10b981' : 'inherit' }}>
                  {orderCalculations.shipping === 0 ? 'FREE' : `$${orderCalculations.shipping.toFixed(2)}`}
                </span>
              </div>
              {orderCalculations.subtotal > 0 && orderCalculations.subtotal <= 100 && (
                <div style={{ fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic' }}>
                  Add ${(100 - orderCalculations.subtotal).toFixed(2)} more for free shipping
                </div>
              )}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 18, fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>
                    ${orderCalculations.total.toFixed(2)}
                  </span>
					</div>
				</div>
            </div>
          
            {orderCalculations.subtotal > 0 && (
              <div style={{ marginTop: '20px', padding: '12px', background: 'color-mix(in oklab, var(--primary) 6%, transparent)', borderRadius: '8px', fontSize: '12px', color: 'var(--primary)' }}>
                💡 Order will be set to "Processing" status after creation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
