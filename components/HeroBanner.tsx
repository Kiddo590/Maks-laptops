export default function HeroBanner() {
  return (
    <section className="hero" id="all">
      <div className="hero-main">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&h=480&fit=crop&q=80"
          alt="Electronics hero"
        />
        <div className="hero-overlay">
          <span className="hero-tag">New Collection 2025</span>
          <h1 className="hero-title">Power Up Your<br />Digital Life</h1>
          <p className="hero-sub">
            The latest smartphones, laptops, and tech — delivered anywhere in Kenya.
          </p>
          <a href="#picks" className="hero-cta">Shop Now →</a>
        </div>
      </div>

      <div className="hero-mini">
        <div className="mini-banner">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=640&h=200&fit=crop&q=80"
            alt="New Arrivals"
          />
          <div className="mini-overlay">
            <span className="mini-label">Just Landed</span>
            <div className="mini-title">New Arrivals</div>
            <a href="#picks" className="mini-link">Explore →</a>
          </div>
        </div>
        <div className="mini-banner">
          <img
            src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=640&h=200&fit=crop&q=80"
            alt="Hot Deals"
          />
          <div className="mini-overlay">
            <span className="mini-label">Limited Time</span>
            <div className="mini-title">Hot Deals</div>
            <a href="#deals" className="mini-link">View Deals →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
