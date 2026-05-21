export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <div className="logo-icon">⚡</div>
            MARKS ELECTRONICS
          </div>
          <p className="footer-about">
            Kenya&apos;s trusted electronics retailer. We offer genuine products, competitive prices,
            and fast delivery across the country. Shop with confidence.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-btn" title="Facebook" aria-label="Facebook">f</a>
            <a href="#" className="social-btn" title="Instagram" aria-label="Instagram">📷</a>
            <a href="#" className="social-btn" title="Twitter / X" aria-label="Twitter">𝕏</a>
            <a href="#" className="social-btn" title="WhatsApp" aria-label="WhatsApp">💬</a>
            <a href="#" className="social-btn" title="YouTube" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">All Products</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Sale &amp; Offers</a></li>
            <li><a href="#">Track My Order</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><a href="#">Help Centre</a></li>
            <li><a href="#">Returns &amp; Refunds</a></li>
            <li><a href="#">Warranty Policy</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>Westlands Mall, Waiyaki Way,<br />Nairobi, Kenya</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>+254 747 900 900</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <span>support@markselectronics.co.ke</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🕒</span>
            <span>Mon–Sat: 8 AM – 7 PM<br />Sun: 10 AM – 5 PM</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Marks Electronics. All rights reserved.</span>
        <div className="footer-payments">
          <span className="payment-chip">M-Pesa</span>
          <span className="payment-chip">Visa</span>
          <span className="payment-chip">Mastercard</span>
          <span className="payment-chip">Airtel Money</span>
        </div>
      </div>
    </footer>
  )
}
