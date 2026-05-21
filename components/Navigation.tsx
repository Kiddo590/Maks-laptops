'use client'

import { usePathname } from 'next/navigation'
import { useCart } from './CartProvider'

const navLinks = [
  { label: 'All Products', href: '/', section: 'all' },
  { label: '📱 Phones & Tablets', href: '/category/phones', section: 'phones' },
  { label: '💻 Laptops', href: '/category/laptops', section: 'laptops' },
  { label: '📺 TVs & Audio', href: '/category/tvs', section: 'tvs' },
  { label: '📷 Cameras', href: '/category/cameras', section: 'cameras' },
  { label: '🎮 Gaming', href: '/category/gaming', section: 'gaming' },
  { label: '🏠 Smart Home', href: '/category/smarthome', section: 'smarthome' },
  { label: '🎧 Headphones', href: '/category/headphones', section: 'headphones' },
  { label: '🔌 Accessories', href: '/category/accessories', section: 'accessories' },
]

export default function Navigation() {
  const { isMobileMenuOpen, closeMobileMenu } = useCart()
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className="main-nav">
        <div className="nav-inner">
          {navLinks.map((link) => (
            <a
              key={link.section}
              href={link.href}
              className={isActive(link.href) ? 'active' : ''}
            >
              {link.label}
            </a>
          ))}
          <a href="/#deals" className="sale-link">🔥 Sale</a>
        </div>
      </nav>

      <div
        className={`overlay${isMobileMenuOpen ? ' show' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      <nav className={`mobile-nav${isMobileMenuOpen ? ' open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="mobile-nav-logo">⚡ MARKS ELECTRONICS</div>
          <button className="close-nav" onClick={closeMobileMenu} aria-label="Close menu">✕</button>
        </div>
        {navLinks.map((link) => (
          <a key={link.section} href={link.href} onClick={closeMobileMenu}>
            {link.label}
          </a>
        ))}
        <a href="/#deals" className="sale-link" onClick={closeMobileMenu}>🔥 Sale</a>
      </nav>
    </>
  )
}
