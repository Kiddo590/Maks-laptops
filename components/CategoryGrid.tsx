const categories = [
  { name: 'Phones & Tablets', img: 'photo-1511707171634-5f897ff02aa9', id: 'phones' },
  { name: 'Laptops & Computers', img: 'photo-1496181133206-80ce9b88a853', id: 'laptops' },
  { name: 'TVs & Audio', img: 'photo-1593359677879-a4bb92f829d1', id: 'tvs' },
  { name: 'Headphones & Earbuds', img: 'photo-1505740420928-5e560c06d30e', id: 'headphones' },
  { name: 'Cameras & Drones', img: 'photo-1516035069371-29a1b244cc32', id: 'cameras' },
  { name: 'Gaming', img: 'photo-1606144042614-b2417e99c4e3', id: 'gaming' },
  { name: 'Smart Home', img: 'photo-1558618666-fcd25c85cd64', id: 'smarthome' },
  { name: 'Accessories', img: 'photo-1583394838336-acd977736f90', id: 'accessories' },
]

export default function CategoryGrid() {
  return (
    <section className="section" id="categories">
      <div className="section-header">
        <h2 className="section-title">Shop by Category</h2>
        <a href="#" className="view-all">View All →</a>
      </div>
      <div className="category-grid">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={`/category/${cat.id}`}
            className="category-card"
          >
            <img
              src={`https://images.unsplash.com/${cat.img}?w=400&h=160&fit=crop&q=80`}
              alt={cat.name}
              loading="lazy"
            />
            <div className="category-info">
              <h3>{cat.name}</h3>
              <span className="category-link">Shop Now →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
