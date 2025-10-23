export default function About() {
  // SEO: AboutPage / Organization JSON-LD (optional but recommended)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Poo Gone®",
    description:
      "Learn about Poo Gone® — a spray-based biological decomposer that breaks down human and animal waste on contact. Septic-safe, non-toxic, and biodegradable.",
    mainEntity: {
      "@type": "Organization",
      name: "Poo Gone",
      brand: "Poo Gone®",
      url: "https://poogone.com/about",
      sameAs: [],
    },
  };

  return (
    <main className="about-root">
      <style>{css}</style>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="about-container">
        <header className="about-header">
          <h1 className="about-title">About Poo Gone®</h1>
          <p className="about-sub">
            The science-driven, spray-based solution that breaks down waste at
            the source.
          </p>
        </header>

        {/* Mission */}
        <section aria-labelledby="mission-title" className="about-section">
          <h2 id="mission-title" className="about-h2">
            Mission
          </h2>
          <blockquote className="about-quote">
            “At Poo Gone®, we believe no one should suffer from embarrassing
            odors.”
          </blockquote>
        </section>

        {/* Our Story */}
        <section aria-labelledby="story-title" className="about-section">
          <h2 id="story-title" className="about-h2">
            Our Story
          </h2>
          <div className="about-story">
            <p>
              Poo Gone® began with a simple question:{" "}
              <em>why mask odors when you can remove the source?</em> Most
              products rely on perfumes or cover scents. Poo Gone® is
              different—it uses a{" "}
              <strong>spray-based biological formula</strong> that accelerates
              natural decomposition.
            </p>
            <p>
              When sprayed directly onto waste, a proprietary blend of{" "}
              <strong>enzymes</strong> and gentle <strong>surfactants</strong>{" "}
              penetrates and breaks down solids. The result is a liquefied,
              flushable or rinseable output that’s{" "}
              <strong>septic-safe, non-toxic, and biodegradable</strong>. It’s
              effective in home toilets, RV tanks, litter boxes, kennels, barns,
              portable units, and more.
            </p>
            <ul className="about-list">
              <li>Breaks down human & animal waste within minutes</li>
              <li>
                Septic & plumbing safe — supports healthy system performance
              </li>
              <li>No harsh chemicals or heavy perfumes</li>
              <li>
                Works anywhere waste collects: toilets, RVs, kennels, stalls,
                bins
              </li>
            </ul>
          </div>
        </section>

        {/* CTA to product / contact */}
        <section className="about-cta" aria-labelledby="cta-title">
          <h2 id="cta-title" className="about-h2">
            Ready to see how it works?
          </h2>
          <div className="about-cta-row">
            <a
              href="#checkout"
              className="btn btn-primary"
              aria-label="Shop Poo Gone now"
            >
              Shop Now
            </a>
            <a
              href="#contact"
              className="btn btn-outline"
              aria-label="Contact Poo Gone support"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------------- CSS in this file ---------------- */
const css = `
.about-root { --pg-blue:#2FA7FF; --pg-ink:#0D1B2A; --pg-border:#e2e8f0; --pg-sub:#334155; --pg-muted:#64748b; --pg-bg:#ffffff; --pg-section:#F8FAFC; --radius:12px; }
.about-container { max-width:900px; margin:0 auto; padding:24px 16px; color:var(--pg-ink); }
.about-header { margin-bottom:16px; }
.about-title { font-size:32px; line-height:1.15; margin:0 0 8px; }
.about-sub { margin:0; color:var(--pg-muted); }

.about-section { background:var(--pg-bg); padding:16px 0; }
.about-h2 { font-size:22px; margin:12px 0; }
.about-quote { margin:8px 0 0; padding:12px 16px; border-left:4px solid var(--pg-blue); background:#F0F9FF; font-style:italic; }

.about-story p { margin:8px 0; color:var(--pg-sub); }
.about-list { margin:12px 0 0 0; padding-left:18px; }
.about-list li { margin:6px 0; }

.founder-card { display:grid; grid-template-columns:120px 1fr; gap:16px; align-items:center; border:1px solid var(--pg-border); border-radius:var(--radius); padding:12px; background:#fff; }
.founder-img { width:120px; height:120px; object-fit:cover; border-radius:10px; display:block; }
.founder-copy { }
.founder-name { margin:0; font-size:18px; }
.founder-quote { margin:6px 0; color:var(--pg-sub); }
.founder-note { margin:6px 0 0; color:var(--pg-muted); font-size:14px; }

.about-cta { margin-top:20px; padding:20px; background:#E0F2FE; text-align:center; border-radius:var(--radius); }
.about-cta-row { margin-top:12px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
.btn { padding:10px 14px; border-radius:12px; text-decoration:none; display:inline-block; font-weight:600; }
.btn-primary { background:var(--pg-blue); color:#fff; }
.btn-outline { border:1px solid var(--pg-blue); color:var(--pg-blue); }

@media (max-width: 720px){
  .about-title { font-size:28px; }
  .about-h2 { font-size:20px; }
  .founder-card { grid-template-columns:1fr; text-align:left; }
  .founder-img { width:100%; height:auto; }
}
`;
