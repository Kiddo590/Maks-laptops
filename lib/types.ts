export interface Product {
  id: string
  name: string
  price: number
  orig_price?: number | null
  category: string
  description?: string | null
  image_url?: string | null
  badge?: 'new' | 'sale' | null
  section: 'picks' | 'bestsellers' | 'deals'
  in_stock: boolean
  created_at: string
}

export type ProductSection = 'picks' | 'bestsellers' | 'deals'
export type ProductBadge = 'new' | 'sale' | null
export type ProductCategory =
  | 'phones'
  | 'laptops'
  | 'tvs'
  | 'headphones'
  | 'cameras'
  | 'gaming'
  | 'smarthome'
  | 'accessories'
