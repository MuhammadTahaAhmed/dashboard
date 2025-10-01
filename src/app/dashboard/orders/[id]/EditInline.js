"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EditInline({ id, firstItem }) {
  const router = useRouter();
  const [qty, setQty] = useState(Number(firstItem?.qty || 1));
  const [price, setPrice] = useState(Number(firstItem?.price || 0));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSave(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, qty: Number(qty), price: Number(price) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok)
        throw new Error(data.error || "Failed to update");
      setSuccess("Saved");
      router.refresh();
    } catch (e) {
      setError(e.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={onSave}
      className="grid"
      style={{
        gridTemplateColumns: "1fr 1fr auto",
        gap: 12,
        alignItems: "end",
      }}
    >
      <div>
        <label className="label" htmlFor="qty">
          Qty
        </label>
        <Input
          id="qty"
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="label" htmlFor="price">
          Price
        </label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>
      {error ? (
        <div
          className="card-text"
          style={{ color: "crimson", gridColumn: "1 / -1" }}
        >
          {error}
        </div>
      ) : null}
      {success ? (
        <div
          className="card-text"
          style={{ color: "green", gridColumn: "1 / -1" }}
        >
          {success}
        </div>
      ) : null}
    </form>
  );
}
