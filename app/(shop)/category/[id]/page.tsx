import { createAdminSupabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { notFound } from 'next/navigation'
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

async function fetchByCategory(category: string): Promise<Product[]> {
  const supabase = createAdminSupabase()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).filter((p) => p.in_stock !== false)
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const meta = CATEGORY_META[params.id]
  if (!meta) notFound()

  const products = await fetchByCategory(params.id)

  return (
    <div style={{ minHeight: '60vh', padding: '2rem 0' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 1.5rem 1.5rem' }}>
        <a href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}>
          ← Back to Home
        </a>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">{meta.emoji} {meta.title}</h2>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {products.length} product{products.length !== 1 ? 's' : ''}
          </span>
        </div>

        {products.length === 0 ? (
          <div className="empty-section" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              No products in this category yet.
            </p>
            <a href="/admin/dashboard" style={{ color: 'var(--primary)' }}>
              Add some from the admin panel →
            </a>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
