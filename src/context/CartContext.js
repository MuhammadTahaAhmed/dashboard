"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload || { items: [] };
    case "ADD": {
      const { item, qty = 1 } = action.payload;
      const idx = state.items.findIndex((x) => x.id === item.id);
      let items;
      if (idx >= 0) {
        items = state.items.map((x, i) =>
          i === idx ? { ...x, qty: Math.min(99, x.qty + qty) } : x
        );
      } else {
        items = [...state.items, { ...item, qty: Math.min(99, qty) }];
      }
      return { ...state, items };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((x) => x.id !== action.payload.id) };
    case "UPDATE": {
      const { id, qty } = action.payload;
      return {
        ...state,
        items: state.items.map((x) => (x.id === id ? { ...x, qty: Math.max(1, Math.min(99, qty)) } : x)),
      };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart:v1");
      if (raw) dispatch({ type: "INIT", payload: JSON.parse(raw) });
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(state));
    } catch {}
  }, [state]);

  const api = useMemo(() => {
    const addItem = (item, qty = 1) => dispatch({ type: "ADD", payload: { item, qty } });
    const removeItem = (id) => dispatch({ type: "REMOVE", payload: { id } });
    const updateQty = (id, qty) => dispatch({ type: "UPDATE", payload: { id, qty } });
    const clearCart = () => dispatch({ type: "CLEAR" });
    const items = state.items;
    const totalCount = items.reduce((s, x) => s + x.qty, 0);
    const totalPrice = items.reduce((s, x) => s + x.qty * (Number(x.price) || 0), 0);
    return { items, totalCount, totalPrice, addItem, removeItem, updateQty, clearCart };
  }, [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
