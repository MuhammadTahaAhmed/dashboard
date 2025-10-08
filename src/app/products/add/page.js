"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setError("");
    const name = form.name.trim();
    const priceNum = Number(form.price);
    if (!name) {
      setError("Name is required");
      return;
    }
    if (!Number.isFinite(priceNum) || priceNum <= 0) {
      setError("Enter a valid price");
      return;
    }

    setSaving(true);
    try {
      await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: name,
          price: priceNum,
          images: form.image ? [form.image] : undefined,
          thumbnail: form.image || undefined,
        }),
      });
      router.push("/products");
    } catch (e) {
      setError("Failed to add product. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <div className="card" style={{ padding: 16, display: "grid", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Add Product</div>
            <div className="text-muted">Create a new product</div>
          </div>
          <Link href="/products" className="btn btn-sm btn-ghost" style={{ textDecoration: "none" }}>Back</Link>
        </div>

        {error ? (
          <div className="card" style={{ padding: 10, color: "#b91c1c", background: "#fee2e2" }}>{error}</div>
        ) : null}

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }} className="text-muted">Name</span>
          <input
            className="input"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Title"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }} className="text-muted">Price</span>
          <input
            className="input"
            value={form.price}
            onChange={(e) => setForm((f) =>({ ...f, price: e.target.value }))}
            placeholder="Price"
            inputMode="decimal"
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }} className="text-muted">Image URL</span>
          <input
            className="input"
            value={form.image}
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
            placeholder="https://..."
          />
        </label>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Link href="/products" className="btn btn-ghost" style={{ textDecoration: "none" }}>Cancel</Link>
          <button
            className="btn"
            disabled={saving}
            onClick={handleSave}
            style={{ width: 120 }}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </section>
  );
}
