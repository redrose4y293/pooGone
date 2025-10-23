import { useState, useMemo } from "react";

export default function Cart() {
  // Dummy cart data for display
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Poo Gone® Spray – 1-Pack",
      price: 12.99,
      qty: 1,
      img: "/3.jpg",
    },
    {
      id: 2,
      name: "Poo Gone® Spray – 3-Pack",
      price: 34.99,
      qty: 1,
      img: "/4.jpg",
    },
  ]);

  const updateQty = (id, delta) => {
    setItems((items) =>
      items.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  };

  const removeItem = (id) => setItems(items.filter((i) => i.id !== id));

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const checkout = () => {
    alert("Proceeding to checkout... (Connect Stripe/Shopify here)");
  };

  return (
    <main className="cart-root">
      <style>{css}</style>
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        {/* Empty cart state */}
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-grid">
            {/* Line items */}
            <section className="cart-items" aria-labelledby="items-title">
              <h2 id="items-title" className="cart-h2">
                Line Items
              </h2>
              {items.map((i) => (
                <article key={i.id} className="cart-item">
                  <img src={i.img} alt={i.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{i.name}</h3>
                    <div className="cart-item-price">${i.price.toFixed(2)}</div>
                    <div className="cart-qty">
                      <button
                        onClick={() => updateQty(i.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={i.qty}
                        min="1"
                        readOnly
                        aria-label="Quantity"
                      />
                      <button
                        onClick={() => updateQty(i.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(i.id)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </section>

            {/* Order summary */}
            <section className="cart-summary" aria-labelledby="summary-title">
              <h2 id="summary-title" className="cart-h2">
                Order Summary
              </h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax (7%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-total">
                <strong>Total:</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button className="checkout-btn" onClick={checkout}>
                Proceed to Checkout
              </button>
              <p className="checkout-note">
                Secure checkout via Stripe or Shopify
              </p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

/* ---------------- CSS in same file ---------------- */
const css = `
.cart-root {
  --pg-blue:#2FA7FF;
  --pg-border:#e2e8f0;
  --pg-ink:#0D1B2A;
  --pg-muted:#64748b;
  --pg-bg:#ffffff;
  --radius:12px;
}

.cart-container { max-width:1000px; margin:0 auto; padding:24px 16px; color:var(--pg-ink); }
.cart-title { font-size:32px; line-height:1.2; margin-bottom:20px; }
.cart-grid { display:grid; grid-template-columns:2fr 1fr; gap:24px; align-items:start; }

.cart-h2 { font-size:22px; margin:12px 0; }
.cart-items { display:grid; gap:16px; }

.cart-item { display:flex; gap:12px; border:1px solid var(--pg-border); border-radius:var(--radius); padding:10px; background:var(--pg-bg); }
.cart-item-img { width:100px; height:100px; object-fit:cover; border-radius:8px; }
.cart-item-info { flex:1; display:flex; flex-direction:column; justify-content:center; gap:6px; }
.cart-item-name { font-size:16px; margin:0; }
.cart-item-price { color:var(--pg-muted); }

.cart-qty { display:flex; align-items:center; gap:6px; }
.cart-qty button {
  width:28px; height:28px; border:1px solid var(--pg-border); background:#f8fafc;
  border-radius:6px; cursor:pointer; font-weight:600;
}
.cart-qty input { width:40px; text-align:center; border:1px solid var(--pg-border); border-radius:6px; padding:4px; }

.remove-btn {
  margin-top:6px; align-self:flex-start;
  background:none; border:none; color:#b91c1c; cursor:pointer; font-size:14px;
}

.cart-summary {
  border:1px solid var(--pg-border); border-radius:var(--radius); padding:16px; background:#f8fafc;
}
.summary-row, .summary-total {
  display:flex; justify-content:space-between; margin:6px 0;
}
.summary-total { border-top:1px solid var(--pg-border); padding-top:8px; font-size:18px; }

.checkout-btn {
  margin-top:12px; width:100%; padding:10px 14px; border:none;
  border-radius:var(--radius); background:var(--pg-blue); color:#fff;
  font-weight:700; cursor:pointer;
}
.checkout-btn:hover { filter:brightness(0.95); }

.checkout-note { margin-top:8px; font-size:13px; color:var(--pg-muted); }

@media (max-width:900px){
  .cart-grid { grid-template-columns:1fr; }
  .cart-item-img { width:80px; height:80px; }
  .cart-title { font-size:28px; }
}
`;
