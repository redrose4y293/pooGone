export default function Terms() {
  return (
    <main className="terms-root">
      <style>{css}</style>
      <div className="terms-container">
        <h1 className="terms-title" style={{ textAlign: "center" }}>
          Terms & Conditions
        </h1>

        <p className="intro">
          Welcome to Poo Gone®. By accessing or purchasing from our website Poo
          Gone, you agree to the following terms. We keep our policies simple,
          fair, and written in plain English.
        </p>

        <section className="terms-section">
          <h2>1. General Use</h2>
          <p>
            You agree to use Poo Gone® products only as directed and in a safe,
            lawful manner. Any misuse or resale without authorization is
            prohibited.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Orders & Payments</h2>
          <p>
            Orders are processed securely through our approved payment partners
            (Stripe, Shopify, or similar). You must provide accurate billing and
            shipping information. All prices are shown in USD unless otherwise
            stated.
          </p>
          <p>
            If your payment fails or information is incomplete, we may contact
            you or cancel the order.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Shipping</h2>
          <p>
            Orders typically ship within 1–3 business days. Shipping rates are
            calculated at checkout and may vary by region. Poo Gone® is not
            responsible for delays caused by carriers, weather, or customs.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Returns & Refunds</h2>
          <p>
            We want you to be happy with your purchase. If you experience any
            issues, contact us at{" "}
            <a href="mailto:support@poogone.com">support@poogone.com</a> within
            30 days of purchase. Please review our{" "}
            <a href="#refund">Refund Policy</a> for detailed information.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Product Use & Safety</h2>
          <p>
            Poo Gone® is a non-toxic, enzyme-based product designed for safe
            decomposition of human and animal waste. Avoid contact with eyes and
            do not ingest. Keep out of reach of children. Read all product
            labels before use.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Intellectual Property</h2>
          <p>
            All content on this Site—including text, images, logos, and
            trademarks—belongs to Poo Gone® and may not be copied or reused
            without permission.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent allowed by law, Poo Gone® and its affiliates
            are not responsible for any damages or losses resulting from use or
            misuse of our products or Site.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Updates to These Terms</h2>
          <p>
            We may update these terms occasionally. Updates will be posted on
            this page with a new “Last Updated” date. Continued use of our Site
            means you accept the changes.
          </p>
        </section>
      </div>
    </main>
  );
}

/* ---------------- CSS kept inside this file ---------------- */
const css = `
.terms-root {
  --pg-blue:#2FA7FF;
  --pg-ink:#0D1B2A;
  --pg-border:#e2e8f0;
  --pg-muted:#475569;
  --radius:12px;
}

.terms-container {
  max-width:900px;
  margin:0 auto;
  padding:28px 20px 32px;
  color:var(--pg-ink);
  background:linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border:1px solid var(--pg-border);
  border-radius:20px;
  box-shadow: 0 10px 24px rgba(2, 8, 23, 0.06);
  text-align: center;
}

.terms-title {
  font-size:34px;
  line-height:1.2;
  margin-bottom:14px;
  letter-spacing:0.2px;
  position: relative;
  text-align: left;
}

.intro {
  font-size:16px;
  color:var(--pg-muted);
  margin-bottom:18px;
}

.terms-section {
  margin:18px 0;
  padding:14px 14px 16px;
  background:#ffffff;
  border:1px solid var(--pg-border);
  border-radius:16px;
  box-shadow: 0 2px 8px rgba(2, 8, 23, 0.03);
}

.terms-section h2 {
  font-size:20px;
  margin-bottom:8px;
  color:var(--pg-ink);
  position:relative;
  text-align: left;
}
.terms-section h2::after{
  content:"";
  position:absolute;
  left:0; bottom:-6px;
  width:64px; height:3px;
  background:linear-gradient(90deg, var(--pg-blue), #7dd3fc);
  border-radius:2px;
}

.terms-section p {
  line-height:1.6;
  color:var(--pg-muted);
}

a {
  color:var(--pg-blue);
  text-decoration:none;
  border-bottom:1px dashed rgba(47,167,255,0.6);
}

.terms-footer {
  margin-top:24px;
  border-top:1px solid var(--pg-border);
  padding-top:12px;
  font-size:14px;
  color:var(--pg-muted);
}

@media (max-width:700px){
  .terms-title { font-size:28px; }
  .terms-section h2 { font-size:18px; }
}
`;
