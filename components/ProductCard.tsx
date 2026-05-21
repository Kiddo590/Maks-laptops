'use client'

import { useCart } from './CartProvider'
import type { Product } from '@/lib/types'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlistItems, openQuickView } = useCart()
  const isWishlisted = wishlistItems.has(product.id)

  return (
    <div className="product-card" data-name={product.name}>
      <a href={`/product/${product.id}`} className="product-card-link">
        <div className="product-img-wrap">
          {product.badge === 'sale' && <span className="badge-sale">Sale</span>}
          {product.badge === 'new' && <span className="badge-new">New</span>}
          <button
            className={`wishlist-btn${isWishlisted ? ' active' : ''}`}
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id) }}
            aria-label="Toggle wishlist"
          >
            {isWishlisted ? '♥' : '♡'}
          </button>
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} loading="lazy" />
          ) : (
            <div className="placeholder-img">📦</div>
          )}
          <button
            className="quick-view-btn"
            onClick={(e) => { e.preventDefault(); openQuickView(product) }}
          >
            Quick View
          </button>
        </div>
        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-price-row">
            <span className="price-current">KES {product.price.toLocaleString()}</span>
            {product.orig_price && (
              <span className="price-old">KES {product.orig_price.toLocaleString()}</span>
            )}
          </div>
        </div>
      </a>
      <div className="product-card-footer">
        <button
          className="add-cart-btn"
          onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image_url: product.image_url })}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  )
}
