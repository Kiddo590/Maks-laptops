'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <div className="newsletter-wrap">
      <div className="newsletter-card">
        <div className="newsletter-icon">📩</div>
        <h2>Stay in the Loop</h2>
        <p>Subscribe for exclusive deals, new arrivals, and tech news.</p>
        {submitted ? (
          <p style={{ color: 'var(--success)', fontWeight: 600, fontSize: 15 }}>
            🎉 Thanks for subscribing! Welcome to Marks Electronics.
          </p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit">Subscribe</button>
          </form>
        )}
      </div>
    </div>
  )
}
