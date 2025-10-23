import { useEffect, useState } from "react";
import "./home.css";

export default function Home() {
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

  // simple, accessible rotator (pause on blur/tab change)
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
    <main>
      {/* Hero */}
      <section id="home" aria-labelledby="hero-title" className="section hero">
        <div className="container layout-two-col">
          <div>
            <h1 id="hero-title" className="h1">
              Flush Away Odors for Good with Poo Gone®
            </h1>
            <p className="lead">
              Spray-based biological decomposer that breaks down human & animal
              waste on contact—septic-safe, non-toxic, and biodegradable.
            </p>
            <div className="cta-row">
              <a
                href="#checkout"
                className="btn btn-primary"
                aria-label="Shop Poo Gone now"
              >
                Shop Now
              </a>
              <a
                href="#about"
                className="btn btn-outline"
                aria-label="Learn more about Poo Gone"
              >
                Learn More
              </a>
            </div>
          </div>
          <div>
            <img
              src="/1.jpg"
              alt="Toilet with odor clouds transforming into flowers, representing odor neutralization at the source"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section aria-labelledby="hiw-title" className="section">
        <div className="container">
          <h2 id="hiw-title" className="h2">
            How It Works
          </h2>
          <p className="subtle">
            Use GIFs/Lottie or static icons for each step.
          </p>
          <div className="grid-3">
            <Step
              n={1}
              title="Spray On"
              desc="Aim directly at the waste—bowl, litter box, kennel, stall, or tank."
              img="/2.jpg"
            />
            <Step
              n={2}
              title="Let It Activate"
              desc="Enzymes penetrate and break down solids within minutes."
              img="/3.jpg"
            />
            <Step
              n={3}
              title="Odor Neutralized at the Source"
              desc="Liquefied waste is ready for flush, wash-down, or safe disposal."
              img="/4.jpg"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="section section-alt">
        <div className="container">
          <h2 id="benefits-title" className="h2">
            Benefits
          </h2>
          <div className="grid-4" role="list">
            <Benefit title="Odor Neutralizing Power" />
            <Benefit title="Safe for Septic" />
            <Benefit title="Family + Pet Safe" />
            <Benefit title="Biodegradable Formula" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
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

            <div
              className="dots"
              role="tablist"
              aria-label="Select testimonial"
            >
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

      {/* CTA band */}
      <section aria-labelledby="cta-title" className="section cta">
        <h2 id="cta-title" className="h2 cta-title">
          Experience the Flush Revolution.
        </h2>
        <div className="cta-row center">
          <a
            href="#product"
            className="btn btn-primary"
            aria-label="Shop Poo Gone now"
          >
            Shop Now
          </a>
          <a
            href="#about"
            className="btn btn-outline"
            aria-label="Learn more about Poo Gone"
          >
            Learn More
          </a>
        </div>
      </section>
    </main>
  );
}

/** Step card */
function Step({ n, title, desc, img }) {
  return (
    <article className="card" aria-label={`Step ${n}: ${title}`}>
      <img
        src={img}
        alt={`Step ${n}: ${title}`}
        className="card-img"
        loading="lazy"
      />
      <div className="card-title">
        <span className="step-index">Step {n}</span> {title}
      </div>
      <p className="card-desc">{desc}</p>
    </article>
  );
}

/** Benefit pill */
function Benefit({ title }) {
  return (
    <div className="benefit" role="listitem">
      {title}
    </div>
  );
}
