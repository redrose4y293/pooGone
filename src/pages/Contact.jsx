import { useState } from "react";

const FORMSPACE_ENDPOINT = "https://formspree.io/f/mgvnzqdp";
// ↑ Replace with your actual Formspace/Formspree endpoint.
// Works with Formspree out of the box; if you're using another service,
// keep the POST shape {name, email, message} or adjust as needed.

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    botField: "",
  });
  const [status, setStatus] = useState({ state: "idle", message: "" }); // idle | sending | success | error

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Honeypot
    if (form.botField) return;

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        state: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      setStatus({
        state: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setStatus({ state: "sending", message: "" });

      // Many “formspace” services accept either JSON or form-encoded. Formspree supports JSON.
      const res = await fetch(FORMSPACE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus({
          state: "success",
          message: "Thanks! Your message has been sent.",
        });
        setForm({ name: "", email: "", message: "", botField: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus({
          state: "error",
          message: data?.error || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      setStatus({
        state: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  return (
    <main className="contact-root">
      <style>{css}</style>

      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-sub">
          Questions about Poo Gone®? Send us a note and our team will get back
          to you.
        </p>

        <form onSubmit={onSubmit} className="contact-form" noValidate>
          {/* Honeypot field (hidden from users) */}
          <label className="hp" htmlFor="bot-field">
            Leave this field empty
          </label>
          <input
            id="bot-field"
            name="botField"
            autoComplete="off"
            value={form.botField}
            onChange={onChange}
            className="hp"
            tabIndex="-1"
          />

          <div className="field">
            <label htmlFor="name">
              Name<span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">
              Email<span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="message">
              Message<span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="How can we help?"
              value={form.message}
              onChange={onChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn"
            disabled={status.state === "sending"}
            aria-busy={status.state === "sending"}
          >
            {status.state === "sending" ? "Sending..." : "Send"}
          </button>

          {status.state === "success" && (
            <p role="status" className="status success">
              {status.message}
            </p>
          )}
          {status.state === "error" && (
            <p role="alert" className="status error">
              {status.message}
            </p>
          )}
        </form>

        <div className="contact-meta">
          <div>
            Customer service:{" "}
            <a href="mailto:support@poogone.com">support@poogone.com</a>
            <br></br>
            Read Global Policy: {" "} <a href="/GB-1.pdf" target="_blank">Click here</a>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------------- CSS (kept in-file) ---------------- */
const css = `
.contact-root {
  --pg-blue:#2FA7FF;
  --pg-ink:#0D1B2A;
  --pg-border:#cbd5e1;
  --pg-muted:#64748b;
  --pg-ok:#065f46;
  --pg-ok-bg:#d1fae5;
  --pg-err:#b91c1c;
  --pg-err-bg:#fee2e2;
  --radius:12px;
}

.contact-container { max-width:800px; margin:0 auto; padding:24px 16px; color:var(--pg-ink); }
.contact-title { font-size:32px; line-height:1.2; margin:0 0 6px; }
.contact-sub { color:var(--pg-muted); margin:0 0 16px; }

.contact-form { display:grid; gap:12px; max-width:560px; margin-left:190; }
.field { display:grid; gap:6px; }
.field label { font-weight:600; }
.field input, .field textarea {
  padding:10px 12px; border:1px solid var(--pg-border); border-radius:var(--radius);
  font:inherit; color:inherit; background:#fff;
}
.field input:focus, .field textarea:focus { outline:2px solid var(--pg-blue); outline-offset:1px; }

.btn {
  padding:10px 14px; border:none; border-radius:var(--radius);
  background:var(--pg-blue); color:#fff; font-weight:700; cursor:pointer;
}
.btn[disabled] { opacity:0.7; cursor:not-allowed; }

.status { margin:6px 0 0; padding:8px 10px; border-radius:10px; font-size:14px; }
.status.success { color:var(--pg-ok); background:var(--pg-ok-bg); }
.status.error { color:var(--pg-err); background:var(--pg-err-bg); }

.contact-meta { margin-top:16px; }
.muted { color:var(--pg-muted); }

/* Honeypot hidden */
.hp { position:absolute !important; left:-10000px !important; width:1px; height:1px; overflow:hidden; }
  
@media (max-width:700px){
  .contact-title { font-size:28px; }
}

/* Tablet adjustments */
@media (max-width: 900px){
  .contact-container { padding:20px 14px; }
  .contact-form { max-width:100%; margin-left:0; }
}

/* Small phones */
@media (max-width: 480px){
  .contact-form { gap:10px; }
  .btn { width:100%; }
}
`;
