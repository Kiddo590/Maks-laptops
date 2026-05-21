import DealCard from './DealCard'
import type { Product } from '@/lib/types'

export default function DealsSection({ deals }: { deals: Product[] }) {
  return (
    <div className="deals-bg" id="deals">
      <div className="deals-inner">
        <div className="deals-header">
          <h2 className="deals-title">🔥 Hot Deals</h2>
          <a href="#" className="deals-view-all">View All Deals →</a>
        </div>
        <div className="deals-grid">
          {deals.length === 0 ? (
            <div className="deals-empty">
              No deals right now — check back soon!
            </div>
          ) : (
            deals.map((deal) => <DealCard key={deal.id} product={deal} />)
          )}
        </div>
      </div>
    </div>
  )
}
