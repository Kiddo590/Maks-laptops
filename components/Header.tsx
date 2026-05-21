'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from './CartProvider'
import type { Product } from '@/lib/types'

export default function Header() {
  const { cartCount, openMobileMenu, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loadedProducts, setLoadedProducts] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const loadProducts = async () => {
    if (loadedProducts) return
    const res = await fetch('/api/products')
    const data = await res.json()
    setAllProducts(data)
    setLoadedProducts(true)
  }

  const handleFocus = () => {
    loadProducts()
    if (query.trim()) setShowDropdown(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setQuery(q)
    setShowDropdown(q.trim().length > 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setShowDropdown(false)
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
    }
  }

  const results = query.trim()
    ? allProducts
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : []

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <button className="hamburger" onClick={openMobileMenu} aria-label="Open menu">
          <span /><span /><span />
        </button>

        <div className="logo">
          <a href="/">
            <div className="logo-icon">⚡</div>
            MARKS ELECTRONICS
          </a>
        </div>

        <form className="search-bar" onSubmit={handleSubmit} ref={searchRef} style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search phones, laptops, TVs…"
            aria-label="Search"
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            autoComplete="off"
          />
          <button className="search-btn" type="submit" aria-label="Search">🔍</button>

          {showDropdown && (
            <div className="search-dropdown">
              {results.length === 0 ? (
                <div className="search-no-results">
                  {loadedProducts ? `No results for "${query}"` : 'Loading…'}
                </div>
              ) : (
                results.map((p) => (
                  <a
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="search-result-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="sri-img">
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name} />
                        : <span>📦</span>}
                    </div>
                    <div className="sri-info">
                      <div className="sri-name">{p.name}</div>
                      <div className="sri-price">KES {p.price.toLocaleString()}</div>
                    </div>
                  </a>
                ))
              )}
              {results.length > 0 && (
                <a
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="search-see-all"
                  onClick={() => setShowDropdown(false)}
                >
                  See all results for "{query}" →
                </a>
              )}
            </div>
          )}
        </form>

        <div className="header-actions">
          <a href="/wishlist" className="action-btn" aria-label="Wishlist">♡</a>
          <button className="action-btn" onClick={openCart} aria-label="Cart">
            🛒
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>

        <div className="header-phone">📞 +254 747 900 900</div>
      </div>
    </header>
  )
}
