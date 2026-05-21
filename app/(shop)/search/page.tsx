import { createAdminSupabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { redirect } from 'next/navigation'
import type { Product } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function searchProducts(q: string): Promise<Product[]> {
  const supabase = createAdminSupabase()
  const { data } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${q}%`)
    .order('created_at', { ascending: false })
  return (data ?? []).filter((p) => p.in_stock !== false)
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams?.q?.trim() ?? ''
  if (!q) redirect('/')

  const products = await searchProducts(q)

  return (
    <div style={{ minHeight: '60vh', padding: '2rem 0' }}>
      <div className="pd-breadcrumb">
        <a href="/">Home</a>
        <span>›</span>
        <span>Search</span>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Results for "{q}"</h2>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {products.length} product{products.length !== 1 ? 's' : ''}
          </span>
        </div>

        {products.length === 0 ? (
          <div className="empty-section">
            <p style={{ marginBottom: '1rem' }}>No products found for "{q}".</p>
            <a href="/" style={{ color: 'var(--primary)' }}>← Back to Home</a>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
