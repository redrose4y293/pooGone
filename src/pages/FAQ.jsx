export default function FAQ() {
  const faqs = [
    {
      q: "What exactly is Poo Gone®?",
      a: "Poo Gone® is a powerful spray-based biological decomposer that breaks down human and animal feces on contact. It turns waste into a flushable or drain-safe liquid using enzyme and microbial action — not harsh chemicals or perfumes.",
    },
    {
      q: "How is this different from odor sprays or air fresheners?",
      a: "Unlike sprays that just mask smells, Poo Gone® breaks down waste itself. It eliminates odor at the source by accelerating natural decomposition instead of covering it up.",
    },
    {
      q: "Where can I use Poo Gone®?",
      a: "You can use it almost anywhere waste collects — toilets, portable toilets, RV tanks, kennels, cat litter boxes, barns, diaper pails, trash bins, and more.",
    },
    {
      q: "Is Poo Gone® safe for septic systems and plumbing?",
      a: "Yes. It’s 100% septic-safe and safe for all plumbing, pipes, and tanks. It even helps reduce buildup in waste systems over time.",
    },
    {
      q: "Is it safe around pets and children?",
      a: "Yes. Poo Gone® is non-toxic, biodegradable, and free from industrial chemicals. Always keep out of reach of children, but it’s safe for use in pet and family environments.",
    },
    {
      q: "How long does it take to work?",
      a: "Most waste starts breaking down within 2–5 minutes. Complete decomposition usually takes 10–30 minutes, depending on the amount and consistency.",
    },
    {
      q: "Does it have a scent?",
      a: "Poo Gone® has a light, clean scent that fades as the waste decomposes — it’s not a fragrance product.",
    },
    {
      q: "How much should I use per application?",
      a: "For toilets or litter boxes, spray 3–5 times directly onto waste. For kennels or stalls, spray generously until the area is evenly coated.",
    },
    {
      q: "Can I use it in public or shared restrooms?",
      a: "Absolutely. Poo Gone® works perfectly in portable toilets, outhouses, event restrooms, and public facilities where waste exposure is frequent.",
    },
    {
      q: "Is there a subscription option?",
      a: "Coming soon! A monthly auto-ship plan is being developed so you’ll never run out. Sign up for updates on our website.",
    },
  ];

  return (
    <main className="faq-root">
      <style>{css}</style>

      <div className="faq-container">
        <h1 className="faq-title">Frequently Asked Questions (FAQ)</h1>

        <div className="faq-list" role="list">
          {faqs.map((item, idx) => (
            <details key={idx} className="faq-item" role="listitem">
              <summary className="faq-q">{item.q}</summary>
              <div className="faq-a">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}

/* -------- CSS inside this file -------- */
const css = `
.faq-root {
  --pg-blue:#2FA7FF;
  --pg-ink:#0D1B2A;
  --pg-border:#e2e8f0;
  --pg-sub:#475569;
  --radius:10px;
}

.faq-container {
  max-width:900px;
  margin:0 auto;
  padding:24px 16px;
  color:var(--pg-ink);
}

.faq-title {
  font-size:32px;
  line-height:1.2;
  margin-bottom:16px;
}

.faq-list {
  display:flex;
  flex-direction:column;
  gap:10px;
}

.faq-item {
  border:1px solid var(--pg-border);
  border-radius:var(--radius);
  padding:10px 14px;
  background:#fff;
  transition:box-shadow 0.2s ease;
}
.faq-item:hover {
  box-shadow:0 1px 4px rgba(0,0,0,0.06);
}

.faq-q { /* summary */
  cursor:pointer;
  font-weight:600;
  outline:none;
  display:flex;
  align-items:center;
  justify-content:space-between; /* text left, icon right */
  gap:12px;
  padding:0; /* remove extra padding so text starts at left */
  list-style:none;
}
/* hide default disclosure triangle */
summary::-webkit-details-marker { display:none; }
summary::marker { content:''; }

.faq-q::after {
  content:'+';
  font-weight:700;
  line-height:1;
  width:18px; height:18px;
  display:inline-flex; align-items:center; justify-content:center;
  transition:transform 0.2s ease;
}
details[open] .faq-q::after { transform:rotate(45deg); }

.faq-a {
  margin-top:8px;
  color:var(--pg-sub);
  line-height:1.5;
  font-size:15px;
}

@media (max-width:700px){
  .faq-title { font-size:26px; }
}
`;
