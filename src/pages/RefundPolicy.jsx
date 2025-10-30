export default function RefundPolicy() {
  return (
    <main className="rp-root">
      <style>{css}</style>

      <div className="rp-container">
        <h1 className="rp-title" style={{ textAlign: "center" }}>
          Refund Policy
        </h1>
        <p className="rp-intro">
          We want you to love Poo Gone®. If something isn’t right, we’re here to
          help—this page explains how refunds, returns, and exchanges work in
          simple terms.
        </p>

        <section className="rp-section">
          <h2>1) Eligibility Window</h2>
          <p>
            You can request a refund within <strong>30 days</strong> of the
            delivery date shown on your tracking.
          </p>
        </section>

        <section className="rp-section">
          <h2>2) What’s Refundable</h2>
          <ul className="rp-list">
            Unopened, unused Poo Gone® bottles in original packaging. Orders
            that arrived <strong>damaged</strong> or <strong>defective</strong>.
            <br></br>
            Incorrect items received (wrong product, pack size, or quantity).
          </ul>
        </section>

        <section className="rp-section">
          <h2>3) What’s Not Refundable</h2>
          <ul className="rp-list">
            Opened or partially used bottles (unless defective or damaged in
            transit).
            <br /> Final-sale or promotional items marked “non-returnable.” Gift
            cards and digital goods.
          </ul>
          <p className="rp-note">
            If your product arrived damaged/defective, you’re covered—see
            Section 6.
          </p>
        </section>

        <section className="rp-section">
          <h2>4) How to Start a Return/Refund</h2>
          <ol className="rp-steps">
            Email <a href="mailto:support@poogone.net">support@poogone.net</a>{" "}
            with your <strong>order #</strong> and the issue.
            <br /> We’ll reply with a return authorization (RMA) and
            instructions.
            <br /> Pack items securely. Include the RMA in the box.
          </ol>
        </section>

        <section className="rp-section">
          <h2>5) Where to Send Returns</h2>
          <p>
            We’ll provide the correct return address in your RMA email (it may
            vary by region/warehouse).
          </p>
          <p className="rp-note">
            Return shipping costs are your responsibility unless we made an
            error or the item was damaged/defective.
          </p>
        </section>

        <section className="rp-section">
          <h2>6) Damaged or Defective Items</h2>
          <p>
            If your order arrived damaged or you believe it’s defective, email{" "}
            <a href="mailto:support@poogone.net">support@poogone.net</a> within{" "}
            <strong>7 days</strong> of delivery with:
          </p>
          <ul className="rp-list">
            Order number
            <br />
            Photos of the packaging and product
            <br />
            Brief description of the issue
            <br />
          </ul>
          <p>We’ll replace or refund as quickly as possible.</p>
        </section>

        <section className="rp-section">
          <h2>7) Refund Timing</h2>
          <p>
            Once your return is received and inspected, we’ll email you about
            approval. Approved refunds are issued to your original payment
            method within <strong>3–10 business days</strong> (bank/card
            processing times vary).
          </p>
        </section>

        <section className="rp-section">
          <h2>8) Exchanges</h2>
          <p>
            Need a different pack size? We can often process a quick exchange.
            Email <a href="mailto:support@poogone.net">support@poogone.net</a>{" "}
            and we’ll help.
          </p>
        </section>

        <section className="rp-section">
          <h2>9) Shipping Fees & Restocking</h2>
          <ul className="rp-list">
            Original shipping fees are non-refundable unless we made an error.
            <br />
            No restocking fee on approved returns within 30 days.
          </ul>
        </section>

        <section className="rp-section">
          <h2>10) Subscriptions (coming soon)</h2>
          <p>
            If you enroll in our future subscription program, you’ll be able to
            skip, pause, or cancel anytime prior to your next renewal date.
            Refunds for shipped subscription orders follow this policy.
          </p>
        </section>
      </div>
    </main>
  );
}

/* ---------------- CSS kept inside this file ---------------- */
const css = `
.rp-root {
  --pg-blue:#2FA7FF;
  --pg-ink:#0D1B2A;
  --pg-border:#e2e8f0;
  --pg-muted:#475569;
  --radius:12px;
}

.rp-container {
  max-width:900px; margin:0 auto; color:var(--pg-ink);
  padding:28px 20px 32px;
  background:linear-gradient(180deg,#ffffff 0%, #f8fafc 100%);
  border:1px solid var(--pg-border);
  border-radius:20px;
  box-shadow:0 10px 24px rgba(2,8,23,.06);
  text-align:center;
}
.rp-title { font-size:34px; line-height:1.2; margin:0 0 14px; letter-spacing:.2px; text-align:left; }
.rp-intro { color:var(--pg-muted); margin-bottom:18px; }

.rp-section {
  margin:18px 0; padding:14px 14px 16px;
  background:#fff; border:1px solid var(--pg-border);
  border-radius:16px; box-shadow:0 2px 8px rgba(2,8,23,.03);
}
.rp-section h2 { font-size:20px; margin:0 0 12px; position:relative; text-align:left; }
.rp-section h2::after{ content:""; position:absolute; left:0; bottom:-6px; width:64px; height:3px; background:linear-gradient(90deg,var(--pg-blue),#7dd3fc); border-radius:2px; }

.rp-list { list-style:none; margin:8px 0 0 0; padding:0; }
.rp-list li { position:relative; padding-left:18px; margin:6px 0; }
.rp-list li::before{ content:""; position:absolute; left:0; top:9px; width:8px; height:8px; border-radius:50%; background:var(--pg-blue); opacity:.85; }

.rp-steps { margin:8px 0 0 0; padding-left:0; counter-reset: step; }
.rp-steps li { list-style:none; margin:8px 0; padding-left:34px; position:relative; }
.rp-steps li::before{ counter-increment: step; content: counter(step); position:absolute; left:0; top:0; width:24px; height:24px; border-radius:999px; background:#e0f2fe; color:#075985; display:inline-flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; border:1px solid #bae6fd; }

.rp-note { color:#64748b; font-size:14px; margin-top:6px; }
.rp-muted { color:#64748b; }

.rp-footer { margin-top:24px; border-top:1px solid var(--pg-border); padding-top:12px; font-size:14px; color:var(--pg-muted); }

a { color:var(--pg-blue); text-decoration:none; border-bottom:1px dashed rgba(47,167,255,.6); }

@media (max-width:700px){
  .rp-title { font-size:28px; }
  .rp-section h2 { font-size:18px; }
  .rp-container { padding:22px 14px 26px; }
}
`;
