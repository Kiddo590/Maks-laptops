-- Marks Electronics — initial product seed
-- Run via: GET /api/seed?secret=<SEED_SECRET>
-- Or paste directly into Supabase SQL editor.

INSERT INTO products (name, price, orig_price, category, description, image_url, badge, section, in_stock) VALUES
  -- ── Mark's Picks ──────────────────────────────────────────────────────────
  ('Samsung Galaxy S24 Ultra', 145000, NULL, 'phones',
   'The ultimate Android flagship with a built-in S Pen, 200 MP camera, and titanium build.',
   'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=400&fit=crop&q=80',
   'new', 'picks', true),

  ('iPhone 15 Pro', 135000, NULL, 'phones',
   'Apple''s most advanced iPhone with A17 Pro chip, titanium design, and USB-C.',
   'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&h=400&fit=crop&q=80',
   'new', 'picks', true),

  ('MacBook Air M2', 148000, NULL, 'laptops',
   'Blazing-fast M2 chip, 18-hour battery life, and a stunning Liquid Retina display.',
   'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop&q=80',
   NULL, 'picks', true),

  ('Dell XPS 15 Laptop', 118000, 138000, 'laptops',
   'Professional-grade laptop with OLED display, Intel Core i7, and 32 GB RAM.',
   'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop&q=80',
   'sale', 'picks', true),

  ('Sony WH-1000XM5 Headphones', 28500, NULL, 'headphones',
   'Industry-leading noise cancellation with 30-hour battery and premium sound.',
   'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop&q=80',
   NULL, 'picks', true),

  ('Canon EOS R50 Camera', 64000, NULL, 'cameras',
   'Compact mirrorless camera with 24.2 MP, 4K video, and advanced autofocus.',
   'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop&q=80',
   'new', 'picks', true),

  ('PlayStation 5 Console', 72000, NULL, 'gaming',
   'Next-gen gaming with ultra-fast SSD, ray tracing, and haptic DualSense controller.',
   'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&h=400&fit=crop&q=80',
   NULL, 'picks', true),

  ('Apple Watch Series 9', 46000, NULL, 'accessories',
   'The most powerful Apple Watch yet with Double Tap gesture and always-on display.',
   'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&h=400&fit=crop&q=80',
   'new', 'picks', true),

  -- ── Best Sellers ──────────────────────────────────────────────────────────
  ('Samsung Galaxy A54', 42000, NULL, 'phones',
   'Best-value mid-range phone with 50 MP camera, 5000 mAh battery and Super AMOLED display.',
   'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop&q=80',
   NULL, 'bestsellers', true),

  ('HP Pavilion 15 Laptop', 68000, 82000, 'laptops',
   'Reliable everyday laptop with Intel Core i5, 16 GB RAM, and FHD IPS display.',
   'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=400&fit=crop&q=80',
   'sale', 'bestsellers', true),

  ('Samsung 65" Crystal UHD TV', 72000, NULL, 'tvs',
   'Stunning 65-inch 4K UHD smart TV with Crystal processor and HDR support.',
   'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&h=400&fit=crop&q=80',
   NULL, 'bestsellers', true),

  ('AirPods Pro (2nd Gen)', 24500, NULL, 'headphones',
   'Active noise cancellation, Adaptive Audio, and up to 30 hours total battery life.',
   'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=400&fit=crop&q=80',
   'new', 'bestsellers', true),

  -- ── Hot Deals ──────────────────────────────────────────────────────────────
  ('Samsung 55" QLED 4K TV', 87000, 115000, 'tvs',
   'Quantum Dot technology delivers vivid colours. 55-inch QLED panel with 120 Hz refresh rate.',
   'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop&q=80',
   'sale', 'deals', true),

  ('iPad Pro 12.9" (M2 Chip)', 98000, 118000, 'phones',
   'The ultimate iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support.',
   'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=400&fit=crop&q=80',
   'sale', 'deals', true),

  ('JBL Charge 5 Speaker', 9500, 13500, 'smarthome',
   'Portable Bluetooth speaker with 20-hour battery, IP67 waterproof, and powerbank feature.',
   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80',
   'sale', 'deals', true),

  ('Logitech MX Master 3 Mouse', 8200, 11000, 'accessories',
   'Advanced wireless mouse with 8K DPI, customisable buttons, and USB-C fast charging.',
   'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop&q=80',
   'sale', 'deals', true);
