import { createAdminSupabase } from '@/lib/supabase'
import CategoryGrid from '@/components/CategoryGrid'
import ProductGrid from '@/components/ProductGrid'
import DealsSection from '@/components/DealsSection'
import Newsletter from '@/components/Newsletter'
import type { Product } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function fetchProducts(): Promise<Product[]> {
  try {
    const supabase = createAdminSupabase()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    // Filter out-of-stock products in JS (avoids PostgREST boolean filter quirks)
    return (data ?? []).filter((p) => p.in_stock !== false)
  } catch (err) {
    console.error('[fetchProducts] error:', err)
    return []
  }
}

const CATEGORY_SECTIONS = [
  { id: 'phones',      title: '📱 Phones & Tablets' },
  { id: 'laptops',     title: '💻 Laptops & Computers' },
  { id: 'tvs',         title: '📺 TVs & Audio' },
  { id: 'headphones',  title: '🎧 Headphones & Earbuds' },
  { id: 'cameras',     title: '📷 Cameras & Drones' },
  { id: 'gaming',      title: '🎮 Gaming' },
  { id: 'smarthome',   title: '🏠 Smart Home' },
  { id: 'accessories', title: '🔌 Accessories' },
]

export default async function HomePage() {
  const all = await fetchProducts()
  const picks = all.filter((p) => p.section === 'picks').slice(0, 8)
  const bestsellers = all.filter((p) => p.section === 'bestsellers').slice(0, 4)
  const deals = all.filter((p) => p.section === 'deals').slice(0, 4)

  return (
    <>
      <CategoryGrid />
      <ProductGrid id="picks" title="Mark's Picks" products={picks} />
      <DealsSection deals={deals} />
      <ProductGrid id="bestsellers" title="Best Sellers" products={bestsellers} />

      {CATEGORY_SECTIONS.map(({ id, title }) => {
        const products = all.filter((p) => p.category === id)
        if (products.length === 0) return null
        return <ProductGrid key={id} id={id} title={title} products={products} />
      })}

      <Newsletter />
    </>
  )
}
