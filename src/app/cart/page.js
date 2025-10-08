"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totalCount, totalPrice, removeItem, updateQty, clearCart } = useCart();

  return (
    <section className="container" style={{ paddingTop: 24, padFdingBottom: 48 }}>
      <div className="card" style={{ padding: 16, display: "grid", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Your Cart</div>
            <div className="text-muted">{totalCount} item{totalCount === 1 ? "" : "s"}</div>
          </div>
          <Link href="/products" className=" btn-ghost" style={{ textDecoration: "none",width: 150 , height: 40, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>Continue Shopping</Link>
        </div>

        {items.length === 0 ? (
          <div className="card" style={{ padding: 16, textAlign: "center" }}>
            Your cart is empty.
          </div>
        ) : (
          <div style={{ display: "grid", gap: 8, }}>
            {items.map((it) => (
              <div key={it.id} className="card" style={{ padding: 12, display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 72, height: 54, background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <img src={it.image} alt={it.name} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{it.name}</div>
                    <div className="text-muted" style={{ fontSize: 12 }}>${Number(it.price).toFixed(2)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    className="input"
                    value={it.qty}
                    onChange={(e) => updateQty(it.id, Number(e.target.value))}
                    style={{ width: 72 }}
                  />
                  <div style={{ width: 100, textAlign: "right", fontWeight: 700 }}>${(it.qty * Number(it.price)).toFixed(2)}</div>
                  <button className="btn btn-sm" onClick={() => removeItem(it.id)}>Remove</button>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8 }}>
              <button className="btn btn-sm" onClick={clearCart}>Clear Cart</button>
              <div style={{ fontWeight: 800, fontSize: 18 }}>Total: ${totalPrice.toFixed(2)}</div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <Link href="/products" className="btn btn-ghost" style={{ textDecoration: "none", width: 150 }}>Continue Shopping</Link>
              <button className="btn" style={{width: 120 , height: 40, borderRadius: 6}} onClick={() => alert("Checkout not implemented in demo")}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}




