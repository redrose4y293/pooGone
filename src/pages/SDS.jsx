import { jsPDF } from "jspdf";

export default function SDS() {
  // Create & download SDS PDF (same content as the accordion)
  const handleDownload = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" }); // 595x842 pt
    const m = 48,
      pw = doc.internal.pageSize.getWidth(),
      ph = doc.internal.pageSize.getHeight();
    const maxW = pw - m * 2;
    let y = m;

    doc.setProperties({
      title: "Poo Gone® – Safety Data Sheet (SDS)",
      subject: "Spray-based biological waste decomposer SDS",
      author: "Poo Gone®",
      keywords:
        "Poo Gone, SDS, Safety Data Sheet, biological decomposer, enzyme",
      creator: "Poo Gone® Website",
    });

    const header = () => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Poo Gone® – Safety Data Sheet (SDS)", m, m - 18);
      doc.setDrawColor("#e2e8f0");
      doc.line(m, m - 14, pw - m, m - 14);
    };
    const footer = () => {
      const n = doc.getNumberOfPages();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor("#64748b");
      doc.text(`Page ${n}`, pw - m, ph - 16, { align: "right" });
    };
    const addPage = () => {
      footer();
      doc.addPage();
      header();
      y = m;
    };

    header();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor("#0D1B2A");
    doc.text("Poo Gone® – Safety Data Sheet (SDS)", m, y);
    y += 22;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor("#475569");
    doc
      .splitTextToSize(
        "Product Type: Spray-based biological waste decomposer • Use: Breakdown of human & animal feces for residential, commercial, and industrial sanitation • Formulation: Enzyme-based, water-soluble, non-toxic",
        maxW
      )
      .forEach((line) => {
        if (y > ph - m) addPage();
        doc.text(line, m, y);
        y += 14;
      });
    y += 8;

    // TOC
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor("#0D1B2A");
    if (y > ph - m) addPage();
    doc.text("Table of Contents", m, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor("#334155");
    toc.forEach((t, i) => {
      if (y > ph - m) addPage();
      doc.text(`${i + 1}. ${t}`, m, y);
      y += 14;
    });
    y += 8;

    // Sections
    sections.forEach((sec, idx) => {
      if (y > ph - m - 40) addPage();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor("#0D1B2A");
      doc.text(`${idx + 1}. ${sec.title}`, m, y);
      y += 16;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor("#334155");
      sec.lines.forEach((raw, li) => {
        const bullet = raw.startsWith("• ") ? "• " : "";
        const text = raw.startsWith("• ") ? raw.slice(2) : raw;
        const chunks = doc.splitTextToSize(text, maxW - (bullet ? 16 : 0));
        chunks.forEach((c, ci) => {
          if (y > ph - m) addPage();
          if (bullet && ci === 0) {
            doc.text(bullet, m, y);
            doc.text(c, m + 12, y);
          } else if (bullet) {
            doc.text(c, m + 12, y);
          } else {
            doc.text(c, m, y);
          }
          y += 14;
        });
        if (li !== sec.lines.length - 1) y += 2;
      });
      y += 8;
    });

    footer();
    doc.save("Poo-Gone_SDS.pdf");
  };

  return (
    <main className="sds-root">
      <style>{css}</style>

      <div className="sds-container">
        <header className="sds-header">
          <h1 className="sds-title">Poo Gone® – Safety Data Sheet (SDS)</h1>
          <p className="sds-sub">
            Product Type: Spray-based biological waste decomposer • Use:
            Breakdown of human & animal feces • Formulation: Enzyme-based,
            water-soluble, non-toxic
          </p>
          <div className="sds-actions">
            <button className="btn primary sds-dl" onClick={handleDownload}>
              <svg
                className="btn-ic"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Download SDS (PDF)</span>
            </button>
          </div>
        </header>

        {/* Accordion (all collapsed by default) */}
        <div className="sds-acc" role="list">
          {sections.map((sec, i) => (
            <details key={i} className="sds-acc-item" role="listitem">
              <summary className="sds-sum">
                <span className="sds-sum-text">
                  {i + 1}. {sec.title}
                </span>
                <span className="sds-indicator" aria-hidden="true" />
              </summary>
              <ul className="sds-body">
                {sec.lines.map((line, j) => (
                  <li key={j}>{line}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ---------- TOC + Content ---------- */
const toc = [
  "Identification",
  "Hazard(s) Identification",
  "Composition/Information on Ingredients",
  "First-Aid Measures",
  "Fire-Fighting Measures",
  "Accidental Release Measures",
  "Handling and Storage",
  "Exposure Controls/Personal Protection",
  "Physical and Chemical Properties",
  "Stability and Reactivity",
  "Toxicological Information",
  "Ecological Information",
  "Disposal Considerations",
  "Transport Information",
  "Regulatory Information",
];

const sections = [
  {
    title: "Identification",
    lines: [
      "Product Name: Poo Gone®",
      "Product Type: Spray-based biological waste decomposer",
      "Recommended Use: Toilet, kennel, RV, litter box, outhouse; septic-safe decomposer spray",
      "Manufacturer: [Your Company Name]",
      "Emergency Contact: support@poogone.com | 1-800-XXX-XXXX",
    ],
  },
  {
    title: "Hazard Identification",
    lines: [
      "GHS Classification: Not classified as hazardous",
      "Label Elements: No pictogram required; Signal Word: None",
      "Precautionary Statements: Avoid eye contact. Do not ingest.",
    ],
  },
  {
    title: "Composition/Information on Ingredients",
    lines: [
      " Proprietary enzyme blend",
      " Non-ionic surfactants",
      " Plant-based solvents",
      " Stabilized water carrier",
      "Hazardous Ingredients: None",
    ],
  },
  {
    title: "First-Aid Measures",
    lines: [
      "Eye Contact: Rinse with water for 15 minutes. Seek medical help if irritation persists.",
      "Skin Contact: Wash with water if irritation occurs (rare).",
      "Inhalation: Move to fresh air if aerosolized. Not expected to cause respiratory issues.",
      "Ingestion: Not intended for ingestion. Rinse mouth and consult physician.",
    ],
  },
  {
    title: "Fire-Fighting Measures",
    lines: [
      "Flammability: Non-flammable",
      "Suitable Extinguishing Media: Water, foam, CO₂",
      "Special Hazards: None known",
    ],
  },
  {
    title: "Accidental Release Measures",
    lines: [
      "Wipe or rinse with water.",
      "Avoid direct runoff into storm drains in high concentrations.",
    ],
  },
  {
    title: "Handling and Storage",
    lines: [
      "Store in a cool, dry place away from direct sunlight.",
      "Keep container closed when not in use.",
      "Do not freeze.",
    ],
  },
  {
    title: "Exposure Controls/Personal Protection",
    lines: [
      "Protective Equipment: Not required under normal use.",
      "Ventilation: General ventilation adequate.",
      "Hygiene: Wash hands after use.",
    ],
  },
  {
    title: "Physical and Chemical Properties",
    lines: [
      "Appearance: Clear to light amber liquid",
      "Odor: Mild, clean",
      "pH: Neutral",
      "Solubility: Fully water-soluble",
      "Boiling Point: ~100°C / 212°F",
      "Flash Point: Not applicable",
    ],
  },
  {
    title: "Stability and Reactivity",
    lines: [
      "Stability: Stable under normal conditions",
      "Incompatibility: None known",
      "Hazardous Decomposition Products: None",
    ],
  },
  {
    title: "Toxicological Information",
    lines: [
      "Acute Toxicity: Not toxic",
      "Irritation: Mild eye irritation possible",
      "Carcinogenicity: None",
      "Sensitization: None known",
    ],
  },
  {
    title: "Ecological Information",
    lines: [
      "Biodegradable.",
      "Non-toxic to aquatic life at normal concentrations.",
      "Septic-safe and environmentally safe when used as directed.",
    ],
  },
  {
    title: "Disposal Considerations",
    lines: [
      "Rinse container and recycle where facilities exist.",
      "Dispose of in accordance with local, state, and federal laws.",
    ],
  },
  {
    title: "Transport Information",
    lines: ["Not regulated as hazardous under DOT, IATA, or IMDG."],
  },
  {
    title: "Regulatory Information",
    lines: [
      "Product is compliant with applicable EPA and TSCA guidelines for non-toxic sanitation products.",
      "Not subject to special labeling or registration.",
    ],
  },
];

/* ---------- CSS (accordion, collapsed by default) ---------- */
const css = `
.sds-root {
  --pg-blue:#2FA7FF;
  --pg-ink:#0D1B2A;
  --pg-muted:#475569;
  --pg-border:#e2e8f0;
  --radius:12px;
}
.sds-container { max-width:900px; margin:0 auto; padding:24px 16px; color:var(--pg-ink); background:#fff; }
.sds-header { margin-bottom:12px; }
.sds-title { font-size:32px; line-height:1.2; margin:0 0 8px; }
.sds-sub { color:var(--pg-muted); margin:0; }
.sds-actions { margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; }

.btn { padding:10px 14px; border-radius:var(--radius); background:#f1f5f9; border:1px solid var(--pg-border); cursor:pointer; font-weight:700; }
.btn.primary { background:var(--pg-blue); color:#fff; border:none; }
.btn.sds-dl { display:inline-flex; align-items:center; gap:8px; box-shadow:0 1px 0 rgba(255,255,255,0.3) inset, 0 1px 2px rgba(2,8,23,0.08); }
.btn.sds-dl:hover { filter: brightness(0.96); }
.btn.sds-dl:active { transform: translateY(1px); }
.btn-ic { display:inline-block; }

.sds-acc { display:flex; flex-direction:column; gap:10px; margin-top:16px; }
.sds-acc-item { border:1px solid var(--pg-border); border-radius:var(--radius); background:#fff; padding:8px 12px; transition: box-shadow .2s ease; }
.sds-acc-item:hover { box-shadow:0 1px 4px rgba(0,0,0,.06); }

.sds-sum { list-style:none; cursor:pointer; font-weight:600; outline:none; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:0; }
.sds-sum::-webkit-details-marker { display:none; }
.sds-sum::marker { content:''; }
.sds-sum-text { display:inline-block; }

/* Plus/Minus indicator on the right */
.sds-indicator {
  width:18px; height:18px; border:1px solid #94a3b8; border-radius:4px; background:#fff; flex:0 0 18px; display:inline-block; position:relative;
}
.sds-indicator::before, .sds-indicator::after {
  content:""; position:absolute; background:#334155; border-radius:1px;
}
.sds-indicator::before { width:10px; height:2px; left:4px; top:8px; }   /* horizontal (always visible) */
.sds-indicator::after  { width:2px; height:10px; left:8px; top:4px; transition:opacity .2s ease; } /* vertical */
details[open] .sds-indicator::after { opacity:0; } /* open => minus */

.sds-body { margin:10px 0 4px 0; padding-left:18px; }
.sds-body li { margin:6px 0; color:var(--pg-muted); }

.sds-footer { margin-top:20px; border-top:1px solid var(--pg-border); padding-top:12px; color:var(--pg-muted); font-size:14px; }

@media (max-width:700px){
  .sds-title { font-size:28px; }
}
`;
