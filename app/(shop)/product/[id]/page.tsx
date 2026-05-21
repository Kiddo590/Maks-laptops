import { createAdminSupabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import ProductActions from './ProductActions'
import type { Product } from '@/lib/types'

export const dynamic = 'force-dynamic'

const CATEGORY_META: Record<string, { title: string; emoji: string }> = {
  phones:      { title: 'Phones & Tablets',    emoji: '📱' },
  laptops:     { title: 'Laptops & Computers', emoji: '💻' },
  tvs:         { title: 'TVs & Audio',          emoji: '📺' },
  headphones:  { title: 'Headphones & Earbuds', emoji: '🎧' },
  cameras:     { title: 'Cameras & Drones',     emoji: '📷' },
  gaming:      { title: 'Gaming',               emoji: '🎮' },
  smarthome:   { title: 'Smart Home',           emoji: '🏠' },
  accessories: { title: 'Accessories',          emoji: '🔌' },
}

async function fetchProduct(id: string): Promise<Product | null> {
  const supabase = createAdminSupabase()
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  if (error) return null
  return data
}

async function fetchRelated(category: string, excludeId: string): Promise<Product[]> {
  const supabase = createAdminSupabase()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(4)
  return (data ?? []).filter((p) => p.in_stock !== false)
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id)
  if (!product) notFound()

  const related = await fetchRelated(product.category, product.id)
  const catMeta = CATEGORY_META[product.category]
  const savings = product.orig_price ? product.orig_price - product.price : 0
  const pct = product.orig_price ? Math.round((savings / product.orig_price) * 100) : 0

  return (
    <div style={{ minHeight: '60vh' }}>
      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <a href="/">Home</a>
        <span>›</span>
        {catMeta && <a href={`/category/${product.category}`}>{catMeta.emoji} {catMeta.title}</a>}
        <span>›</span>
        <span>{product.name}</span>
      </div>

      {/* Product Hero */}
      <div className="pd-hero section">
        <div className="pd-image-wrap">
          {product.badge === 'sale' && <span className="badge-sale">Sale</span>}
          {product.badge === 'new' && <span className="badge-new">New</span>}
          {product.image_url
            ? <img src={product.image_url} alt={product.name} />
            : <div className="pd-placeholder">📦</div>}
        </div>

        <div className="pd-info">
          {catMeta && (
            <a href={`/category/${product.category}`} className="pd-cat-tag">
              {catMeta.emoji} {catMeta.title}
            </a>
          )}
          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-price-row">
            <span className="pd-price">KES {product.price.toLocaleString()}</span>
            {product.orig_price && (
              <span className="price-old">KES {product.orig_price.toLocaleString()}</span>
            )}
            {pct > 0 && <span className="pd-savings-badge">{pct}% off</span>}
          </div>
          {savings > 0 && (
            <div className="pd-savings">You save KES {savings.toLocaleString()}</div>
          )}

          {product.description && (
            <p className="pd-desc">{product.description}</p>
          )}

          <div className={`pd-stock${product.in_stock ? '' : ' out'}`}>
            {product.in_stock ? '✓ In Stock' : '✗ Out of Stock'}
          </div>

          <ProductActions product={product} />
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <ProductGrid
          id="related"
          title={`More ${catMeta?.title ?? 'Products'}`}
          products={related}
        />
      )}
    </div>
  )
}
