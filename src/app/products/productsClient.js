"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductsClient() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [sortBy, setSortBy] = useState("relevance");
  const { addItem } = useCart();

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("https://dummyjson.com/products", {
          cache: "no-store",
        });
        const data = await res.json();
        const normalized = Array.isArray(data?.products)
          ? data.products.map((p) => ({
              id: p.id,
              name: p.title ?? p.name ?? "Product",
              price:
                typeof p.price === "number" ? p.price : Number(p.price) || 0,
              image:
                p.thumbnail ||
                (Array.isArray(p.images) ? p.images[0] : p.image) ||
                "/vercel.svg",
            }))
          : [];
        if (!ignore) setProducts(normalized);
      } catch {
        if (!ignore) setProducts([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => !q || p.name.toLowerCase().includes(q));
  }, [products, query]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list; // relevance
    }
  }, [filtered, sortBy]);

  return (
    <section
      className="container"
      style={{
        paddingTop: 24,
        paddingBottom: 48,
        maxWidth: "100%",
        width: "100%",
      }}
    >
      <div className="card" style={{ padding: 16, display: "grid", gap: 8 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Products</div>
            <div className="text-muted">Browse our latest products</div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              className="input"
              placeholder="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: 260 }}
            />
            <select
              className="input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: 180 }}
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A → Z</option>
            </select>
            <Link
              href="/products/add"
              className="btn"
              style={{
                width: 120,
                backgroundColor: "#000000",
                color: "#ffffff",
                border: "none",
                borderRadius: 8,
                padding: 8,
                cursor: "pointer",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>

      <div style={{ height: 16 }} />

      {loading ? (
        <div className="card" style={{ padding: 24, textAlign: "center" }}>
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ padding: 24, textAlign: "center" }}>
          No products found.
        </div>
      ) : (
        <div className="dashboard-grid">
          <div style={{ gridColumn: "1 / -1" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 16,
                // width: "100vw",
              }}
            >
              {sorted.map((items) => (
                <div
                  key={items.id}
                  className="card"
                  style={{ padding: 12, display: "grid", gap: 8 }}
                >
                  <div
                    style={{
                      aspectRatio: "4 / 3",
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 8,
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={items.image}
                      alt={items.name}
                      style={{ maxWidth: "90%", maxHeight: "100%" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>
                        {items.name}
                      </div>
                      <div className="text-muted" style={{ fontSize: 12 }}>
                        ${items.price.toFixed(2)}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link href={`/products/${items.id}`} className="btn btn-sm" style={{ textDecoration: "none" }}>
                        Buy
                      </Link>
                      <button
                        className="btn btn-sm"
                        onClick={() =>
                          addItem({ id: items.id, name: items.name, price: items.price, image: items.image }, 1)
                        }
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-sm btn-ghost"
                        disabled={deletingIds.has(items.id)}
                        onClick={async () => {
                          if (!window.confirm("Delete this product?")) return;
                          setDeletingIds((prev) => {
                            const s = new Set(prev);
                            s.add(items.id);
                            return s;
                          });
                          const prevList = products;
                          setProducts((p) => p.filter((x) => x.id !== items.id));
                          try {
                            await fetch(`https://dummyjson.com/products/${items.id}`, { method: "DELETE" });
                          } catch (e) {
                            setProducts(prevList);
                          } finally {
                            setDeletingIds((prev) => {
                              const s = new Set(prev);
                              s.delete(items.id);
                              return s;
                            });
                          }
                        }}
                      >
                        {deletingIds.has(items.id) ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
