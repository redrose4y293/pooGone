// Simple global cart store with subscribe + localStorage persistence
// Usage:
//   import { useCart, cart } from '../lib/cartStore'
//   const { items, addItem, updateQty, removeItem, clear } = useCart()

let state = load()
const listeners = new Set()

function load() {
  try {
    const raw = localStorage.getItem('pg_cart')
    return raw ? JSON.parse(raw) : { items: [] }
  } catch {
    return { items: [] }
  }
}

function persist() {
  try { localStorage.setItem('pg_cart', JSON.stringify(state)) } catch {}
}

function emit() { listeners.forEach((fn) => fn(state)) }

function bump() {
  // Make new object references so React subscribers reliably re-render
  state = { items: [...state.items] }
  persist(); emit()
}

function findIndexBySku(sku) { return state.items.findIndex((i) => i.sku === sku) }

export const cart = {
  getState() { return state },
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) },

  addItem(item, qty = 1) {
    // item: { sku, name, price, img }
    const i = findIndexBySku(item.sku)
    if (i >= 0) state.items[i].qty += qty
    else state.items.push({ ...item, qty })
    bump()
  },

  updateQty(sku, qty) {
    const i = findIndexBySku(sku)
    if (i < 0) return
    state.items[i].qty = Math.max(1, Number(qty) || 1)
    bump()
  },

  removeItem(sku) {
    state.items = state.items.filter((i) => i.sku !== sku)
    bump()
  },

  clear() {
    state.items = []
    bump()
  },

  // Set quantity exactly; if qty <= 0 remove. If item not found and qty>0, add using provided item info.
  setQty(sku, qty, itemIfAdding) {
    const i = findIndexBySku(sku)
    const qtyVal = Math.max(0, Number(qty) || 0)
    if (qtyVal <= 0) {
      if (i >= 0) state.items.splice(i, 1)
      bump(); return
    }
    if (i >= 0) {
      state.items[i].qty = qtyVal
    } else if (itemIfAdding) {
      state.items.push({ ...itemIfAdding, sku, qty: qtyVal })
    }
    bump()
  },
}

// React hook to access the store
import { useEffect, useState } from 'react'
export function useCart() {
  const [snapshot, setSnapshot] = useState(cart.getState())
  useEffect(() => cart.subscribe(setSnapshot), [])

  const subtotal = snapshot.items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return {
    items: snapshot.items,
    subtotal,
    addItem: cart.addItem,
    updateQty: cart.updateQty,
    removeItem: cart.removeItem,
    setQty: cart.setQty,
    clear: cart.clear,
  }
}
