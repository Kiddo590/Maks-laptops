'use client'

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
import type { Product } from '@/lib/types'

export interface CartItem {
  id: string
  name: string
  price: number
  image_url?: string | null
  qty: number
}

interface CartContextValue {
  cartItems: CartItem[]
  cartCount: number
  wishlistItems: Set<string>
  isMobileMenuOpen: boolean
  isCartOpen: boolean
  addToCart: (product: { id: string; name: string; price: number; image_url?: string | null }) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  toggleWishlist: (id: string) => void
  openMobileMenu: () => void
  closeMobileMenu: () => void
  openCart: () => void
  closeCart: () => void
  quickViewProduct: Product | null
  openQuickView: (product: Product) => void
  closeQuickView: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [toast, setToast] = useState({ msg: '', show: false })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)

  const showToast = useCallback((msg: string) => {
    setToast({ msg, show: true })
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000)
  }, [])

  const addToCart = useCallback(
    (product: { id: string; name: string; price: number; image_url?: string | null }) => {
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === product.id)
        if (existing) {
          return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        }
        return [...prev, { ...product, qty: 1 }]
      })
      showToast(`✓ ${product.name} added to cart`)
    },
    [showToast],
  )

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i))
  }, [])

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlistItems((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
          showToast('♥ Added to wishlist')
        }
        return next
      })
    },
    [showToast],
  )

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = ''
  }, [])

  const openCart = useCallback(() => {
    setIsCartOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeCart = useCallback(() => {
    setIsCartOpen(false)
    document.body.style.overflow = ''
  }, [])

  const openQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null)
    document.body.style.overflow = ''
  }, [])

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, wishlistItems, isMobileMenuOpen, isCartOpen, addToCart, removeFromCart, updateQty, toggleWishlist, openMobileMenu, closeMobileMenu, openCart, closeCart, quickViewProduct, openQuickView, closeQuickView }}
    >
      {children}

      {/* Cart Drawer */}
      <div className={`overlay${isCartOpen ? ' show' : ''}`} onClick={closeCart} aria-hidden="true" style={{ zIndex: 2998 }} />
      <div className={`cart-drawer${isCartOpen ? ' open' : ''}`} role="dialog" aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">🛒 Cart ({cartCount})</h2>
          <button className="cart-close" onClick={closeCart} aria-label="Close cart">✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <button className="cart-continue-btn" onClick={closeCart}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img">
                    {item.image_url
                      ? <img src={item.image_url} alt={item.name} />
                      : <span>📦</span>}
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">KES {item.price.toLocaleString()}</div>
                    <div className="cart-item-controls">
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)} disabled={item.qty <= 1}>−</button>
                      <span className="qty-val">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      <button className="cart-remove" onClick={() => removeFromCart(item.id)}>🗑</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span className="cart-subtotal-amount">KES {subtotal.toLocaleString()}</span>
              </div>
              <button className="cart-checkout-btn">Proceed to Checkout →</button>
              <button className="cart-continue-btn" onClick={closeCart}>Continue Shopping</button>
            </div>
          </>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="qv-overlay" onClick={closeQuickView} role="dialog" aria-modal="true">
          <div className="qv-modal" onClick={(e) => e.stopPropagation()}>
            <button className="qv-close" onClick={closeQuickView} aria-label="Close">✕</button>
            <div className="qv-image-wrap">
              {quickViewProduct.badge === 'sale' && <span className="badge-sale">Sale</span>}
              {quickViewProduct.badge === 'new' && <span className="badge-new">New</span>}
              {quickViewProduct.image_url
                ? <img src={quickViewProduct.image_url} alt={quickViewProduct.name} />
                : <div className="qv-placeholder">📦</div>}
            </div>
            <div className="qv-info">
              <span className="qv-category">{quickViewProduct.category}</span>
              <h2 className="qv-name">{quickViewProduct.name}</h2>
              <div className="qv-price-row">
                <span className="qv-price">KES {quickViewProduct.price.toLocaleString()}</span>
                {quickViewProduct.orig_price && (
                  <span className="price-old">KES {quickViewProduct.orig_price.toLocaleString()}</span>
                )}
              </div>
              {quickViewProduct.description && (
                <p className="qv-desc">{quickViewProduct.description}</p>
              )}
              <div className="qv-actions">
                <button
                  className="add-cart-btn"
                  onClick={() => {
                    addToCart({ id: quickViewProduct.id, name: quickViewProduct.name, price: quickViewProduct.price, image_url: quickViewProduct.image_url })
                    closeQuickView()
                  }}
                >
                  🛒 Add to Cart
                </button>
                <button
                  className={`qv-wishlist-btn${wishlistItems.has(quickViewProduct.id) ? ' active' : ''}`}
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  aria-label="Toggle wishlist"
                >
                  {wishlistItems.has(quickViewProduct.id) ? '♥' : '♡'}
                </button>
              </div>
              <a href={`/product/${quickViewProduct.id}`} className="qv-full-link">
                View Full Details →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`toast${toast.show ? ' show' : ''}`} role="alert" aria-live="polite">
        {toast.msg}
      </div>
    </CartContext.Provider>
  )
}
