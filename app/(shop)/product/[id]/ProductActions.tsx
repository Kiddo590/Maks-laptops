'use client'

import { useState } from 'react'
import { useCart } from '@/components/CartProvider'
import type { Product } from '@/lib/types'

export default function ProductActions({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlistItems } = useCart()
  const [qty, setQty] = useState(1)
  const isWishlisted = wishlistItems.has(product.id)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image_url: product.image_url })
    }
  }

  return (
    <div className="pd-actions">
      <div className="pd-qty-row">
        <span className="pd-qty-label">Quantity</span>
        <div className="pd-qty-ctrl">
          <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
          <span className="qty-val">{qty}</span>
          <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
        </div>
      </div>
      <button className="pd-add-btn" onClick={handleAdd}>🛒 Add to Cart</button>
      <button
        className={`pd-wishlist-btn${isWishlisted ? ' active' : ''}`}
        onClick={() => toggleWishlist(product.id)}
      >
        {isWishlisted ? '♥ Wishlisted' : '♡ Add to Wishlist'}
      </button>
    </div>
  )
}
