'use client'

import { useCart } from './CartProvider'
import type { Product } from '@/lib/types'

export default function DealCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const savings = product.orig_price ? product.orig_price - product.price : 0
  const pct = product.orig_price ? Math.round((savings / product.orig_price) * 100) : 0

  return (
    <div className="deal-card" data-name={product.name}>
      <div className="deal-img-wrap">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} loading="lazy" />
        ) : (
          <div className="placeholder-img">📦</div>
        )}
        <span className="deal-stock-badge">⚡ Limited Stock</span>
      </div>
      <div className="deal-info">
        <div className="deal-name">{product.name}</div>
        <div className="deal-prices">
          <span className="deal-current">KES {product.price.toLocaleString()}</span>
          {product.orig_price && (
            <span className="deal-old">KES {product.orig_price.toLocaleString()}</span>
          )}
        </div>
        {savings > 0 && (
          <div className="deal-savings">
            Save KES {savings.toLocaleString()} ({pct}% off)
          </div>
        )}
        <button className="buy-now-btn" onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image_url: product.image_url })}>
          Buy Now →
        </button>
      </div>
    </div>
  )
}
