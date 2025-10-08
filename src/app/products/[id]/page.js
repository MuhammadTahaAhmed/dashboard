"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        const normalized = {
          id: data.id,
          name: data.title ?? data.name ?? "Product",
          price: typeof data.price === "number" ? data.price : Number(data.price) || 0,
          image: data.thumbnail || (Array.isArray(data.images) ? data.images[0] : data.image) || "/vercel.svg",
          description: data.description ?? "",
          category: data.category ?? "",
          brand: data.brand ?? "",
          rating: data.rating ?? null,
        };
        if (!ignore) setProduct(normalized);
      } catch (e) {
        if (!ignore) setError("Failed to load product.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    if (id) load();
    return () => {
      ignore = true;
    };
  }, [id]);

  async function handleConfirm() {
    setProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      router.push("/products");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <section className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <div className="card" style={{ padding: 16, display: "grid", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Product Details</div>
            <div className="text-muted">View and checkout product</div>
          </div>
          <Link href="/products" className="btn btn-sm btn-ghost" style={{ textDecoration: "none" }}>Back</Link>
        </div>

        {loading ? (
          <div className="card" style={{ padding: 16, textAlign: "center" }}>Loading…</div>
        ) : error ? (
          <div className="card" style={{ padding: 12, color: "#b91c1c", background: "#fee2e2" }}>{error}</div>
        ) : product ? (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 320, maxWidth: "100%", aspectRatio: "4 / 3", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 8, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={product.image} alt={product.name} style={{ maxWidth: "95%", maxHeight: "100%" }} />
              </div>
              <div style={{ minWidth: 240, display: "grid", gap: 8 }}>
                <div style={{ fontWeight: 800, fontSize: 18 }}>{product.name}</div>
                <div className="text-muted" style={{ fontSize: 14 }}>${product.price.toFixed(2)}</div>
                {product.brand ? <div><strong>Brand:</strong> {product.brand}</div> : null}
                {product.category ? <div><strong>Category:</strong> {product.category}</div> : null}
                {product.rating != null ? <div><strong>Rating:</strong> {product.rating}</div> : null}
                {product.description ? <div className="text-muted" style={{ marginTop: 8 }}>{product.description}</div> : null}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, flexWrap: "wrap" }}>
              <button
                className="btn btn-ghost"
                onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, 1)}
              >
                Add to Cart
              </button>
              <Link href="/cart" className="btn btn-ghost" style={{ textDecoration: "none" }}>Go to Cart</Link>
              <Link href="/products" className="btn btn-ghost" style={{ textDecoration: "none" }}>Back</Link>
              <button className="btn" disabled={processing} onClick={handleConfirm}>{processing ? "Processing…" : "Confirm"}</button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
