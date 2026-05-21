import ProductCard from './ProductCard'
import type { Product } from '@/lib/types'

interface Props {
  id: string
  title: string
  products: Product[]
}

export default function ProductGrid({ id, title, products }: Props) {
  return (
    <section className="section" id={id}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <a href="#" className="view-all">View All →</a>
      </div>
      <div className="product-grid">
        {products.length === 0 ? (
          <div className="empty-section">
            No products here yet.{' '}
            <a href="/admin/dashboard" style={{ color: 'var(--primary)' }}>
              Add some from the admin panel →
            </a>
          </div>
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </section>
  )
}
