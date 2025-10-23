import "./App.css";
import "./pages/home.css";
import { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import About from "./pages/About.jsx";
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";
import Checkout from "./pages/Checkout.jsx";
import Terms from "./pages/Terms.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";
import SDS from "./pages/SDS.jsx";

function App() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const NavLinks = ({ onClick }) => (
    <>
      <a href="#home" onClick={onClick}>
        Home
      </a>
      <a href="#product" onClick={onClick}>
        Product
      </a>
      <a href="#about" onClick={onClick}>
        About
      </a>
      <a href="#sds" onClick={onClick}>
        SDS
      </a>
      <a href="#checkout" onClick={onClick}>
        Checkout
      </a>
      <a href="#terms" onClick={onClick}>
        Terms
      </a>
      <a href="#refund" onClick={onClick}>
        Refund
      </a>
      <a href="#faq" onClick={onClick}>
        FAQ
      </a>
      <a href="#contact" onClick={onClick}>
        Contact
      </a>
    </>
  );

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <header className="navbar">
        <div className="navbar-inner">
          <a className="brand" href="#top">
            <img
              src="/2.jpg"
              alt="Poo Gone logo"
              className="brand-logo"
              loading="eager"
            />
            <span>Poo Gone®</span>
          </a>
          <nav className="navlinks">
            <NavLinks />
          </nav>
          <button
            className="nav-toggle"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
        {/* Mobile Dropdown tab under navbar */}
        <div className={`nav-dropdown ${open ? "open" : ""}`}>
          <button
            className="dropdown-close"
            aria-label="Close menu"
            onClick={close}
          >
            ✕
          </button>
          <NavLinks onClick={close} />
        </div>
      </header>

      {/* Content */}
      <main id="top" style={{ flex: 1 }}>
        {/* Home: now rendered from src/pages/Home.jsx so your edits show live */}
        <Home />

        {/* 2) Product */}
        <section id="product">
          <Product />
        </section>

        {/* 3) About */}
        <section id="about">
          <About />
        </section>
        {/* 11) SDS */}
        <section id="sds">
          <SDS />
        </section>

        {/* 6) Checkout (as in-page section after FAQ) */}
        <section id="checkout">
          <Checkout />
        </section>

        {/* 8) Legal: Terms */}
        <section id="terms">
          <Terms />
        </section>

        {/* 10) Legal: Refund Policy */}
        <section id="refund">
          <RefundPolicy />
        </section>
        {/* 4) FAQ */}
        <section id="faq">
          <FAQ />
        </section>
        {/* 5) Contact */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #e5e7eb", padding: "16px" }}>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#terms">Terms</a>
            <a href="#refund">Refund Policy</a>
            <a href="#sds">SDS</a>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", gap: 8, alignItems: "center" }}
          >
            <input
              placeholder="Email sign-up"
              style={{
                padding: "8px 10px",
                border: "1px solid #cbd5e1",
                borderRadius: 6,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 12px",
                border: "1px solid #0ea5e9",
                background: "#0ea5e9",
                color: "#fff",
                borderRadius: 6,
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#475569" }}>
          © {new Date().getFullYear()} Poo Gone®. All rights reserved.
        </div>
      </footer>

      {/* Bottom-right logo badge (swap with actual logo if available) */}
      <div
        style={{
          position: "fixed",
          right: 12,
          bottom: 12,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: "6px 10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        Poo Gone®
      </div>
    </div>
  );
}

function Step({ n, title, img, desc }) {
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 12 }}>
      <img
        src={img}
        alt={`Step ${n}: ${title}`}
        style={{
          width: "100%",
          height: 160,
          objectFit: "cover",
          borderRadius: 8,
        }}
        loading="lazy"
      />
      <div style={{ marginTop: 8, fontWeight: 600 }}>
        Step {n}: {title}
      </div>
      {desc ? (
        <div style={{ fontSize: 14, color: "#475569" }}>{desc}</div>
      ) : (
        <div style={{ fontSize: 14, color: "#475569" }}>
          Short description placeholder.
        </div>
      )}
    </div>
  );
}

function Benefit({ title }) {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: 16,
        textAlign: "center",
      }}
    >
      {title}
    </div>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "“It liquefies waste in minutes. Game changer for our RV trips.”",
      author: "RV Owner",
    },
    {
      quote: "“No perfume clouds—just clean. Septic-safe and fast.”",
      author: "Home User",
    },
    {
      quote: "“Kennel cleanup is way quicker now.”",
      author: "Pet Shelter Manager",
    },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    const onVisibility = () => {
      if (document.hidden) clearInterval(id);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [testimonials.length]);

  return (
    <section aria-labelledby="testimonials-title" className="section">
      <div className="container narrow center">
        <h2 id="testimonials-title" className="h2">
          What users say
        </h2>
        <div
          className="testimonial"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          aria-live="polite"
        >
          <blockquote id={`testimonial-panel-${index}`} className="quote">
            {testimonials[index].quote}
            {testimonials[index].author ? (
              <footer className="quote-footer">
                — {testimonials[index].author}
              </footer>
            ) : null}
          </blockquote>
          <div className="dots" role="tablist" aria-label="Select testimonial">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-controls={`testimonial-panel-${i}`}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              >
                <span className="sr-only">Show testimonial {i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
