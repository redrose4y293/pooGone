import { useMemo, useState } from "react";
import { useCart } from "../lib/cartStore";
// Mini picker config for empty-cart state (matches Product packs)
const MINI_PACKS = [
  { label: "1-pack", sku: "PG-SPR-1", price: 12.99 },
  { label: "3-pack", sku: "PG-SPR-3", price: 34.99 },
  { label: "6-pack", sku: "PG-SPR-6", price: 62.99 },
];

// Formspree endpoint placeholder (replace with your code)
const FORMSPACE_ENDPOINT = "https://formspree.io/f/your-code";

export default function Checkout() {
  const { items, updateQty, removeItem, clear, setQty } = useCart();
  const [shippingMethod, setShippingMethod] = useState("standard"); // standard | express | free
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState({ state: "idle", msg: "" }); // idle | working | error
  const [errors, setErrors] = useState({});

  // Customer + shipping form
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    country: "US",
  });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Derived quantities and form validity
  const quantities = useMemo(() => {
    const map = new Map(items.map((it) => [it.sku, it.qty]));
    return MINI_PACKS.map((p) => Number(map.get(p.sku)) || 0);
  }, [items]);

  const totalQty = useMemo(
    () => quantities.reduce((a, b) => a + b, 0),
    [quantities]
  );
  const fieldValid = (f) => String(form[f] || "").trim().length > 0;
  const emailValid = /.+@.+\..+/.test(String(form.email || "").trim());
  const isFormValid =
    totalQty > 0 &&
    emailValid &&
    fieldValid("fullName") &&
    fieldValid("address1") &&
    fieldValid("city") &&
    fieldValid("state") &&
    fieldValid("postal") &&
    fieldValid("country") &&
    agree;

  // Totals
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const shippingPrice = useMemo(() => {
    if (shippingMethod === "free") return 0;
    if (shippingMethod === "express") return 14.99;
    // Standard: Free over $50, else $4.99
    return subtotal > 50 ? 0 : 4.99;
  }, [shippingMethod, subtotal]);

  const tax = useMemo(() => subtotal * 0.07, [subtotal]);
  const total = useMemo(
    () => subtotal + shippingPrice + tax,
    [subtotal, shippingPrice, tax]
  );

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  async function handleCheckout(e) {
    e.preventDefault();
    setStatus({ state: "idle", msg: "" });
    const nextErr = {};
    if (totalQty <= 0) nextErr.items = "Please add at least 1 item.";
    if (!emailValid) nextErr.email = "Enter a valid email.";
    ["fullName", "address1", "city", "state", "postal", "country"].forEach(
      (k) => {
        if (!fieldValid(k)) nextErr[k] = "Required";
      }
    );
    if (!agree) nextErr.agree = "Required";
    setErrors(nextErr);
    if (Object.keys(nextErr).length) return;

    // Basic validation
    if (
      !form.email ||
      !validEmail(form.email) ||
      !form.fullName ||
      !form.address1 ||
      !form.city ||
      !form.state ||
      !form.postal ||
      !form.country
    ) {
      setStatus({
        state: "error",
        msg: "Please complete all required fields with a valid email.",
      });
      return;
    }
    if (!agree) {
      setStatus({
        state: "error",
        msg: "Please accept the terms & refund policy to continue.",
      });
      return;
    }

    // Serialize minimal order info for Formspree
    const payload = {
      _subject: "New Checkout Submission (Poo Gone)",
      email: form.email,
      name: form.fullName,
      address1: form.address1,
      address2: form.address2,
      city: form.city,
      state: form.state,
      postal: form.postal,
      country: form.country,
      shippingMethod,
      items: items.map((i) => ({
        sku: i.sku,
        name: i.name,
        qty: i.qty,
        price: i.price,
      })),
      totals: { subtotal, shipping: shippingPrice, tax, total },
    };

    try {
      setStatus({ state: "working", msg: "" });
      const res = await fetch(FORMSPACE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Form submit error");
      setStatus({ state: "idle", msg: "" });
      clear();
      alert("Thank you! Your order request has been sent.");
    } catch (err) {
      setStatus({ state: "error", msg: "Could not submit. Please try again." });
    }
  }

  return (
    <main className="co-root">
      <style>{css}</style>

      <div className="co-container">
        <h1 className="co-title">Checkout</h1>
        <p className="co-sub">
          Complete your order below. This form submits to Formspree.
        </p>

        <form className="co-grid" onSubmit={handleCheckout} noValidate>
          {/* Your Items: fixed rows for 1-pack, 3-pack, 6-pack */}
          <section className="co-card" aria-labelledby="items-title">
            <h2 id="items-title" className="co-h2">
              Your Items
            </h2>
            <div className="co-items">
              {MINI_PACKS.map((p) => {
                const current = items.find((x) => x.sku === p.sku);
                const qty = current?.qty || 0;
                return (
                  <article key={p.sku} className="co-item">
                    <img
                      src="/5.jpg"
                      alt="Poo Gone bottle"
                      className="co-item-img"
                    />
                    <div className="co-item-info">
                      <h3 className="co-item-name">Poo Gone® {p.label}</h3>
                      <div className="co-item-price">${p.price.toFixed(2)}</div>
                      <div className="co-qty">
                        <button
                          type="button"
                          onClick={() => setQty(p.sku, qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={qty}
                          min="0"
                          onChange={(e) =>
                            setQty(p.sku, e.target.value, {
                              name: `Poo Gone® ${p.label}`,
                              price: p.price,
                              img: "/1.jpg",
                            })
                          }
                          aria-label="Quantity"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setQty(p.sku, qty + 1, {
                              name: `Poo Gone® ${p.label}`,
                              price: p.price,
                              img: "/3.jpg",
                            })
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      {qty > 0 ? (
                        <button
                          type="button"
                          onClick={() => setQty(p.sku, 0)}
                          className="co-remove"
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
            {errors.items ? (
              <div className="field-err">{errors.items}</div>
            ) : null}
          </section>

          {/* Customer & Shipping */}
          <section className="co-card" aria-labelledby="cust-ship-title">
            <h2 id="cust-ship-title" className="co-h2">
              Customer & Shipping
            </h2>

            <div className="field">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                required
                aria-invalid={!emailValid}
              />
              {errors.email ? (
                <div className="field-err">{errors.email}</div>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="fullName">Full Name*</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Jane Doe"
                value={form.fullName}
                onChange={onChange}
                required
              />
              {errors.fullName ? (
                <div className="field-err">{errors.fullName}</div>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="address1">Address*</label>
              <input
                id="address1"
                name="address1"
                type="text"
                placeholder="123 Main St"
                value={form.address1}
                onChange={onChange}
                required
              />
              {errors.address1 ? (
                <div className="field-err">{errors.address1}</div>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="address2">Apt / Suite</label>
              <input
                id="address2"
                name="address2"
                type="text"
                placeholder="Unit 4B"
                value={form.address2}
                onChange={onChange}
              />
            </div>

            <div className="field-grid">
              <div className="field">
                <label htmlFor="city">City*</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={onChange}
                  required
                />
                {errors.city ? (
                  <div className="field-err">{errors.city}</div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="state">State/Province*</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={form.state}
                  onChange={onChange}
                  required
                />
                {errors.state ? (
                  <div className="field-err">{errors.state}</div>
                ) : null}
              </div>
            </div>

            <div className="field-grid">
              <div className="field">
                <label htmlFor="postal">Postal Code*</label>
                <input
                  id="postal"
                  name="postal"
                  type="text"
                  value={form.postal}
                  onChange={onChange}
                  required
                />
                {errors.postal ? (
                  <div className="field-err">{errors.postal}</div>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="country">Country*</label>
                <select
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={onChange}
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                </select>
                {errors.country ? (
                  <div className="field-err">{errors.country}</div>
                ) : null}
              </div>
            </div>

            <fieldset className="ship-methods">
              <legend className="co-legend">Shipping Method</legend>
              <label className="radio">
                <input
                  type="radio"
                  name="ship"
                  checked={shippingMethod === "standard"}
                  onChange={() => setShippingMethod("standard")}
                />
                <span>Standard (Free over $50, else $4.99)</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="ship"
                  checked={shippingMethod === "express"}
                  onChange={() => setShippingMethod("express")}
                />
                <span>Express ($14.99)</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="ship"
                  checked={shippingMethod === "free"}
                  onChange={() => setShippingMethod("free")}
                />
                <span>Free (Promo / Local pickup)</span>
              </label>
            </fieldset>
          </section>

          {/* Payment */}
          <section className="co-card" aria-labelledby="pay-title">
            <h2 id="pay-title" className="co-h2">
              Payment
            </h2>

            <p className="muted">
              No payment collected here. We will contact you to complete the
              order.
            </p>

            <label className="agree">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>
                I agree to the <a href="/terms">Terms</a> and{" "}
                <a href="/refund-policy">Refund Policy</a>.
              </span>
            </label>
            {errors.agree ? (
              <div className="field-err">{errors.agree}</div>
            ) : null}
          </section>

          {/* Order Summary */}
          <aside className="co-card co-summary" aria-labelledby="sum-title">
            <h2 id="sum-title" className="co-h2">
              Order Summary
            </h2>

            <ul className="sum-items">
              {items.map((i) => (
                <li key={i.sku} className="sum-row">
                  <span>
                    {i.name} × {i.qty}
                  </span>
                  <span>${(i.price * i.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="sum-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="sum-row">
              <span>Shipping</span>
              <span>
                {shippingPrice === 0 ? "Free" : `$${shippingPrice.toFixed(2)}`}
              </span>
            </div>
            <div className="sum-row">
              <span>Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="sum-total">
              <strong>Total</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button
              type="submit"
              className="pay-btn"
              disabled={status.state === "working" || !isFormValid}
              aria-busy={status.state === "working"}
            >
              {status.state === "working" ? "Submitting..." : "Submit Order"}
            </button>

            <p className="muted secure-note">
              All payments are processed securely.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}

/* ---------------- CSS in same file ---------------- */
const css = `
.co-root {
  --pg-blue:#2FA7FF;
  --pg-ink:#0D1B2A;
  --pg-border:#e2e8f0;
  --pg-muted:#64748b;
  --pg-ok:#065f46;
  --pg-err:#b91c1c;
  --radius:12px;
}

.co-container { max-width:900px; margin:0 auto; padding:24px 16px; color:var(--pg-ink); }
.co-title { font-size:32px; line-height:1.2; margin:0 0 6px; }
.co-sub { color:var(--pg-muted); margin:0 0 16px; }

.co-grid {
  display:grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 16px;
  align-items: start;
}

.co-card {
  border:1px solid var(--pg-border);
  border-radius:var(--radius);
  padding:16px;
  background:#fff;
}

.co-h2 { font-size:20px; margin:0 0 10px; }
.field { display:grid; gap:6px; margin-bottom:10px; }
.field-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
.field input, .field select {
  padding:10px 12px; border:1px solid var(--pg-border); border-radius:10px; font:inherit; color:inherit;
}
.field input:focus, .field select:focus { outline:2px solid var(--pg-blue); outline-offset:1px; }

.ship-methods { margin-top:8px; border:none; padding:0; }
.co-legend { font-weight:700; margin-bottom:6px; }
.radio { display:flex; align-items:center; gap:8px; margin:6px 0; }

.muted { color:var(--pg-muted); font-size:14px; }
.agree { display:flex; align-items:center; gap:8px; margin-top:10px; }
.agree a { color:inherit; text-decoration:underline; }

.alert.error { margin-top:10px; color:var(--pg-err); background:#fee2e2; padding:8px 10px; border-radius:10px; }

.co-summary { position:sticky; top:12px; align-self:start; }
.sum-items { list-style:none; padding:0; margin:0 0 8px; display:grid; gap:6px; }
.sum-row { display:flex; justify-content:space-between; gap:10px; margin:4px 0; }
.sum-total { display:flex; justify-content:space-between; gap:10px; margin-top:10px; border-top:1px solid var(--pg-border); padding-top:8px; font-size:18px; }

.pay-btn {
  margin-top:12px; width:100%; padding:10px 14px;
  border:none; border-radius:var(--radius);
  background:var(--pg-blue); color:#fff; font-weight:700; cursor:pointer;
}
.pay-btn[disabled] { opacity:0.7; cursor:not-allowed; }
.secure-note { margin-top:8px; }
.field-err { color: var(--pg-err); font-size: 13px; margin-top: 6px; }

.co-items { display:grid; gap:12px; }
.co-item { display:flex; gap:10px; border:1px solid var(--pg-border); border-radius:var(--radius); padding:8px; background:#fff; }
.co-item-img { width:56px; height:56px; object-fit:cover; border-radius:8px; }
.co-item-info { flex:1; display:flex; flex-direction:column; justify-content:center; gap:6px; }
.co-item-name { font-size:15px; margin:0; }
.co-item-price { color:var(--pg-muted); }

.mini-picker { display:block; }
.mini-row { display:flex; gap:10px; align-items:center; }
.mini-thumb { width:48px; height:48px; border-radius:10px; background:#f1f5f9; display:flex; align-items:center; justify-content:center; font-weight:700; color:#0d1b2a; }
.mini-form { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
.mini-label { font-weight:600; }
.mini-select { padding:8px 10px; border:1px solid var(--pg-border); border-radius:10px; }
.mini-add { padding:8px 12px; background:var(--pg-blue); color:#fff; border:none; border-radius:10px; font-weight:700; cursor:pointer; }

@media (max-width: 900px){
  .co-grid { grid-template-columns:1fr; }
  .co-title { font-size:28px; }
}
`;
