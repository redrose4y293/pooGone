import { useMemo, useState } from "react";
import { cart } from "../lib/cartStore";

export default function Product() {
  // --- Data (would come from CMS / API later) ---
  const images = [
    { src: "/2.jpg", alt: "Poo Gone spray bottle front" },
    { src: "/3.jpg", alt: "Poo Gone in use on toilet bowl" },
    { src: "/4.jpg", alt: "Poo Gone used in cat litter box" },
    { src: "/5.jpg", alt: "Poo Gone used in kennel cleanup" },
  ];
  const view360 = {
    src: "/360.gif",
    alt: "360° rotating view of Poo Gone bottle",
  };

  const packs = [
    { label: "1-pack", sku: "PG-SPR-1", price: 12.99 },
    { label: "3-pack", sku: "PG-SPR-3", price: 34.99 },
    { label: "6-pack", sku: "PG-SPR-6", price: 62.99 },
  ];

  const features = [
    "Breaks down human & animal waste within minutes",
    "Septic & plumbing safe",
    "No harsh chemicals or perfumes",
    "Eco-friendly packaging",
  ];

  const reviews = [
    {
      rating: 5,
      title: "RV lifesaver",
      body: "Liquefies fast. No lingering smell.",
      author: "Maya P.",
      verified: true,
    },
    {
      rating: 5,
      title: "Works on litter boxes",
      body: "Cleanup is way easier now.",
      author: "Chris D.",
      verified: true,
    },
    {
      rating: 4,
      title: "Great for kennels",
      body: "Speeds up hose-downs.",
      author: "Shelter Ops",
      verified: false,
    },
  ];

  // --- UI state ---
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [show360, setShow360] = useState(false);
  const [selectedPack, setSelectedPack] = useState(packs[0].label);

  const currentPrice = useMemo(
    () => packs.find((p) => p.label === selectedPack)?.price ?? packs[0].price,
    [selectedPack]
  );
  const currentSku = useMemo(
    () => packs.find((p) => p.label === selectedPack)?.sku ?? packs[0].sku,
    [selectedPack]
  );

  // --- Handlers ---
  const addToCart = () => {
    const img = images[selectedIndex]?.src || "/5.jpg";
    cart.addItem(
      {
        sku: currentSku,
        name: `Poo Gone® ${selectedPack}`,
        price: currentPrice,
        img,
      },
      1
    );
    const el = document.getElementById("checkout");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // --- SEO: Product JSON-LD ---
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Poo Gone® Spray — Biological Waste Decomposer",
    image: images.map((i) => i.src),
    description:
      "Spray-based biological decomposer that breaks down human and animal feces on contact. Septic-safe, non-toxic, biodegradable.",
    sku: currentSku,
    brand: { "@type": "Brand", name: "Poo Gone" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: packs[0].price.toFixed(2),
      highPrice: packs[packs.length - 1].price.toFixed(2),
      offerCount: packs.length,
      offers: packs.map((p) => ({
        "@type": "Offer",
        priceCurrency: "USD",
        price: p.price.toFixed(2),
        sku: p.sku,
        availability: "https://schema.org/InStock",
        url: "https://poogone.com/products/poo-gone",
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (
        reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      ).toFixed(1),
      reviewCount: String(reviews.length),
    },
  };

  return (
    <main className="pgp-root">
      <style>{css}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="pgp-container">
        <h1 className="pgp-title">
          Poo Gone® Spray — Biological Waste Decomposer
        </h1>

        <div className="pgp-grid">
          {/* Gallery */}
          <section aria-labelledby="gallery-title" className="pgp-gallery">
            <h2 id="gallery-title" className="sr-only">
              Product Gallery
            </h2>

            <div className="pgp-media">
              {show360 ? (
                <img
                  src={view360.src}
                  alt={view360.alt}
                  className="pgp-main-img"
                />
              ) : (
                <img
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  className="pgp-main-img"
                />
              )}
            </div>

            <div className="pgp-thumbs" role="list">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  role="listitem"
                  className={`pgp-thumb ${
                    !show360 && selectedIndex === i ? "active" : ""
                  }`}
                  aria-label={`View image ${i + 1}`}
                  onClick={() => {
                    setShow360(false);
                    setSelectedIndex(i);
                  }}
                >
                  <img src={img.src} alt={img.alt} />
                </button>
              ))}
            </div>
          </section>

          {/* Info */}
          <section aria-labelledby="info-title" className="pgp-info">
            <h2 id="info-title" className="sr-only">
              Product Information
            </h2>

            <p className="pgp-desc">
              Spray-based biological decomposer that breaks down human and
              animal waste on contact — not a perfume or masking agent.
              Septic-safe, non-toxic, and biodegradable.
            </p>

            <div className="pgp-price">
              Price: <strong>${currentPrice.toFixed(2)}</strong>
            </div>

            <label className="pgp-label" htmlFor="pack">
              Pack Size
            </label>
            <select
              id="pack"
              className="pgp-select"
              value={selectedPack}
              onChange={(e) => setSelectedPack(e.target.value)}
              aria-label="Select pack size"
            >
              {packs.map((p) => (
                <option key={p.label} value={p.label}>
                  {p.label}
                </option>
              ))}
            </select>

            <button
              className="pgp-add"
              onClick={addToCart}
              aria-label={`Add ${selectedPack} to cart`}
            >
              Add to Cart
            </button>

            <ul className="pgp-features"></ul>

            <div className="pgp-usage">
              <h3>Usage Instructions</h3>
              <p>
                <strong>Spray. Wait. Flush / Dispose.</strong>
              </p>
              <p>
                Spray directly onto solid waste. Allow enzymes to activate for a
                few minutes; then flush, rinse, or wash down as appropriate.
              </p>
            </div>
          </section>
        </div>

        {/* Reviews */}
        <section aria-labelledby="reviews-title" className="pgp-reviews">
          <h2 id="reviews-title">Customer Reviews</h2>
          <div className="pgp-stars" aria-label="Average rating">
            {renderStars(avgRating(reviews))}
            <span className="pgp-stars-text">
              {avgRating(reviews).toFixed(1)} / 5
            </span>
          </div>

          <div className="pgp-reviews-list">
            {reviews.map((r, idx) => (
              <article
                key={idx}
                className="pgp-review"
                aria-label={`Review ${idx + 1}`}
              >
                <div className="pgp-review-head">
                  <div
                    className="pgp-review-stars"
                    aria-label={`${r.rating} out of 5 stars`}
                  >
                    {renderStars(r.rating)}
                  </div>
                  {r.verified ? (
                    <span className="pgp-verified" title="Verified purchase">
                      Verified
                    </span>
                  ) : null}
                </div>
                <h3 className="pgp-review-title">{r.title}</h3>
                <p className="pgp-review-body">{r.body}</p>
                {r.author ? (
                  <p className="pgp-review-author">— {r.author}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- Helpers (JSX-safe) ---------- */
function renderStars(n) {
  const full = Math.round(n);
  return (
    <span aria-hidden="true">
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}

function avgRating(list) {
  return list.reduce((s, r) => s + r.rating, 0) / (list.length || 1);
}

/* ---------- CSS-in-file ---------- */
const css = `
.pgp-root { --pg-blue:#2FA7FF; --pg-ink:#0D1B2A; --pg-border:#e2e8f0; --pg-sub:#334155; --radius:12px; }
.pgp-container { max-width:1100px; margin:0 auto; padding:24px 16px; color:var(--pg-ink); }

.pgp-title { font-size:32px; line-height:1.15; margin:0 0 16px; }
.pgp-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:24px; align-items:start; }

.pgp-gallery {}
.pgp-media { border:1px solid var(--pg-border); border-radius:16px; overflow:hidden; background:#fff; }
.pgp-main-img { width:100%; height:auto; display:block; max-height:520px; object-fit:cover; }

.pgp-thumbs { margin-top:12px; display:flex; gap:8px; flex-wrap:wrap; }
.pgp-thumb { border:1px solid var(--pg-border); border-radius:10px; padding:0; background:#fff; cursor:pointer; }
.pgp-thumb img { width:68px; height:68px; border-radius:10px; object-fit:cover; display:block; }
.pgp-thumb.active { outline:2px solid var(--pg-blue); outline-offset:2px; }
.pgp-360 { display:inline-flex; align-items:center; justify-content:center; width:68px; height:68px; border-radius:10px; font-weight:700; color:#0d1b2a; }

.pgp-info {}
.pgp-desc { color:var(--pg-sub); margin:0 0 12px; }
.pgp-price { margin:12px 0; font-size:18px; }

.pgp-label { display:block; font-weight:600; margin-top:4px; }
.pgp-select { margin-top:6px; padding:10px 12px; border:1px solid var(--pg-border); border-radius:10px; }

.pgp-add {
  margin-top:12px; padding:10px 14px; background:var(--pg-blue); color:#fff; border-radius:12px; border:none; cursor:pointer; font-weight:700;
}
.pgp-add:hover { filter:brightness(0.95); }

.pgp-features { margin:16px 0 0; padding-left:18px; }
.pgp-features li { margin:6px 0; }

.pgp-usage { margin-top:18px; }
.pgp-usage h3 { margin:16px 0 6px; font-size:18px; }

.pgp-reviews { margin-top:28px; }
.pgp-stars { display:flex; align-items:center; gap:8px; font-size:20px; }
.pgp-stars-text { font-size:14px; color:#64748b; }

.pgp-reviews-list { margin-top:12px; display:grid; grid-template-columns:1fr; gap:12px; }
.pgp-review { border:1px solid var(--pg-border); border-radius:12px; padding:14px; background:#fff; }
.pgp-review-head { display:flex; align-items:center; gap:8px; justify-content:space-between; }
.pgp-review-stars { font-size:18px; }
.pgp-verified { font-size:12px; color:#047857; background:#d1fae5; padding:2px 6px; border-radius:999px; }

.pgp-review-title { margin:6px 0; font-size:16px; }
.pgp-review-body { margin:4px 0; color:#334155; }
.pgp-review-author { margin:4px 0 0; color:#64748b; font-size:14px; }

.sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0; }

@media (max-width: 900px) {
  .pgp-grid { grid-template-columns:1fr; }
  .pgp-title { font-size:28px; }
}
`;
