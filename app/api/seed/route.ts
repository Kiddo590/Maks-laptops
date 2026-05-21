import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabase } from '@/lib/supabase'

const SEED_PRODUCTS = [
  { name: 'Samsung Galaxy S24 Ultra', price: 145000, orig_price: null, category: 'phones', description: 'The ultimate Android flagship with a built-in S Pen, 200 MP camera, and titanium build.', image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=400&fit=crop&q=80', badge: 'new', section: 'picks', in_stock: true },
  { name: 'iPhone 15 Pro', price: 135000, orig_price: null, category: 'phones', description: "Apple's most advanced iPhone with A17 Pro chip, titanium design, and USB-C.", image_url: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&h=400&fit=crop&q=80', badge: 'new', section: 'picks', in_stock: true },
  { name: 'MacBook Air M2', price: 148000, orig_price: null, category: 'laptops', description: 'Blazing-fast M2 chip, 18-hour battery life, and a stunning Liquid Retina display.', image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop&q=80', badge: null, section: 'picks', in_stock: true },
  { name: 'Dell XPS 15 Laptop', price: 118000, orig_price: 138000, category: 'laptops', description: 'Professional-grade laptop with OLED display, Intel Core i7, and 32 GB RAM.', image_url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop&q=80', badge: 'sale', section: 'picks', in_stock: true },
  { name: 'Sony WH-1000XM5 Headphones', price: 28500, orig_price: null, category: 'headphones', description: 'Industry-leading noise cancellation with 30-hour battery and premium sound.', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&q=80', badge: null, section: 'picks', in_stock: true },
  { name: 'Canon EOS R50 Camera', price: 64000, orig_price: null, category: 'cameras', description: 'Compact mirrorless camera with 24.2 MP, 4K video, and advanced autofocus.', image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop&q=80', badge: 'new', section: 'picks', in_stock: true },
  { name: 'PlayStation 5 Console', price: 72000, orig_price: null, category: 'gaming', description: 'Next-gen gaming with ultra-fast SSD, ray tracing, and haptic DualSense controller.', image_url: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=400&fit=crop&q=80', badge: null, section: 'picks', in_stock: true },
  { name: 'Apple Watch Series 9', price: 46000, orig_price: null, category: 'accessories', description: 'The most powerful Apple Watch yet with Double Tap gesture and always-on display.', image_url: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&h=400&fit=crop&q=80', badge: 'new', section: 'picks', in_stock: true },
  { name: 'Samsung Galaxy A54', price: 42000, orig_price: null, category: 'phones', description: 'Best-value mid-range phone with 50 MP camera, 5000 mAh battery and Super AMOLED display.', image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop&q=80', badge: null, section: 'bestsellers', in_stock: true },
  { name: 'HP Pavilion 15 Laptop', price: 68000, orig_price: 82000, category: 'laptops', description: 'Reliable everyday laptop with Intel Core i5, 16 GB RAM, and FHD IPS display.', image_url: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=400&fit=crop&q=80', badge: 'sale', section: 'bestsellers', in_stock: true },
  { name: 'Samsung 65" Crystal UHD TV', price: 72000, orig_price: null, category: 'tvs', description: 'Stunning 65-inch 4K UHD smart TV with Crystal processor and HDR support.', image_url: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&h=400&fit=crop&q=80', badge: null, section: 'bestsellers', in_stock: true },
  { name: 'AirPods Pro (2nd Gen)', price: 24500, orig_price: null, category: 'headphones', description: 'Active noise cancellation, Adaptive Audio, and up to 30 hours total battery life.', image_url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=400&fit=crop&q=80', badge: 'new', section: 'bestsellers', in_stock: true },
  { name: 'Samsung 55" QLED 4K TV', price: 87000, orig_price: 115000, category: 'tvs', description: 'Quantum Dot technology delivers vivid colours. 55-inch QLED panel with 120 Hz refresh rate.', image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop&q=80', badge: 'sale', section: 'deals', in_stock: true },
  { name: 'iPad Pro 12.9" (M2 Chip)', price: 98000, orig_price: 118000, category: 'phones', description: 'The ultimate iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support.', image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop&q=80', badge: 'sale', section: 'deals', in_stock: true },
  { name: 'JBL Charge 5 Speaker', price: 9500, orig_price: 13500, category: 'smarthome', description: 'Portable Bluetooth speaker with 20-hour battery, IP67 waterproof, and powerbank feature.', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80', badge: 'sale', section: 'deals', in_stock: true },
  { name: 'Logitech MX Master 3 Mouse', price: 8200, orig_price: 11000, category: 'accessories', description: 'Advanced wireless mouse with 8K DPI, customisable buttons, and USB-C fast charging.', image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop&q=80', badge: 'sale', section: 'deals', in_stock: true },
]

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = createAdminSupabase()

  // Check if already seeded
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  if (count && count > 0) {
    return NextResponse.json({ message: 'Already seeded', count })
  }

  const { error } = await supabase.from('products').insert(SEED_PRODUCTS)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ message: 'Seeded successfully', count: SEED_PRODUCTS.length })
}
