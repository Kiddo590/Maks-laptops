'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Product, ProductBadge, ProductCategory, ProductSection } from '@/lib/types'

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'phones', label: '📱 Phones & Tablets' },
  { value: 'laptops', label: '💻 Laptops' },
  { value: 'tvs', label: '📺 TVs & Audio' },
  { value: 'headphones', label: '🎧 Headphones & Earbuds' },
  { value: 'cameras', label: '📷 Cameras' },
  { value: 'gaming', label: '🎮 Gaming' },
  { value: 'smarthome', label: '🏠 Smart Home' },
  { value: 'accessories', label: '🔌 Accessories' },
]

const SECTIONS: { value: ProductSection; label: string }[] = [
  { value: 'picks', label: "Mark's Picks" },
  { value: 'bestsellers', label: 'Best Sellers' },
  { value: 'deals', label: 'Hot Deals' },
]

type FormState = {
  name: string
  price: string
  orig_price: string
  category: ProductCategory
  description: string
  image_url: string
  badge: ProductBadge | ''
  section: ProductSection
  in_stock: boolean
}

const DEFAULT_FORM: FormState = {
  name: '',
  price: '',
  orig_price: '',
  category: 'phones',
  description: '',
  image_url: '',
  badge: '',
  section: 'picks',
  in_stock: true,
}

export default function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState({ msg: '', type: 'success', show: false })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type, show: true })
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 3500)
  }, [])

  async function fetchProducts() {
    setLoading(true)
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin')
  }

  function openAdd() {
    setEditingId(null)
    setForm(DEFAULT_FORM)
    setImageFile(null)
    setImagePreview('')
    setShowForm(true)
  }

  function openEdit(p: Product) {
    setEditingId(p.id)
    setForm({
      name: p.name,
      price: String(p.price),
      orig_price: p.orig_price ? String(p.orig_price) : '',
      category: p.category as ProductCategory,
      description: p.description ?? '',
      image_url: p.image_url ?? '',
      badge: p.badge ?? '',
      section: p.section,
      in_stock: p.in_stock,
    })
    setImageFile(null)
    setImagePreview(p.image_url ?? '')
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return form.image_url || null
    setUploading(true)
    const fd = new FormData()
    fd.append('image', imageFile)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    setUploading(false)
    if (!res.ok) {
      showToast('Image upload failed. Using URL if provided.', 'error')
      return form.image_url || null
    }
    const { url } = await res.json()
    return url
  }

  async function handleSave() {
    if (!form.name.trim() || !form.price) {
      showToast('Name and price are required.', 'error')
      return
    }
    setSaving(true)
    const imageUrl = await uploadImage()
    const body = {
      name: form.name.trim(),
      price: parseInt(form.price),
      orig_price: form.orig_price ? parseInt(form.orig_price) : null,
      category: form.category,
      description: form.description.trim() || null,
      image_url: imageUrl,
      badge: form.badge || null,
      section: form.section,
      in_stock: form.in_stock,
    }
    const url = editingId ? `/api/products/${editingId}` : '/api/products'
    const method = editingId ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setSaving(false)
    if (res.ok) {
      showToast(editingId ? '✓ Product updated!' : '✓ Product added!')
      closeForm()
      fetchProducts()
    } else {
      const err = await res.json()
      showToast(err.error ?? 'Save failed', 'error')
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    const res = await fetch(`/api/products/${deleteId}`, { method: 'DELETE' })
    setDeleteId(null)
    if (res.ok) {
      showToast('Product deleted.')
      fetchProducts()
    } else {
      showToast('Delete failed.', 'error')
    }
  }

  async function toggleStock(p: Product) {
    await fetch(`/api/products/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ in_stock: !p.in_stock }),
    })
    setProducts((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, in_stock: !x.in_stock } : x)),
    )
  }

  const visible = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'all' || p.category === filterCat
    return matchSearch && matchCat
  })

  const inStock = products.filter((p) => p.in_stock).length
  const outStock = products.filter((p) => !p.in_stock).length
  const dealCount = products.filter((p) => p.section === 'deals').length

  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <div className="admin-header-logo">
            <div className="logo-icon">⚡</div>
            MARKS ELECTRONICS
          </div>
          <span className="admin-header-subtitle">Admin Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="/" target="_blank" style={{ fontSize: 13, color: 'var(--primary)' }}>
            View Shop →
          </a>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>

      <div className="admin-container">
        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card stat-blue">
            <div className="stat-value">{products.length}</div>
            <div className="stat-label">Total Products</div>
          </div>
          <div className="stat-card stat-green">
            <div className="stat-value">{inStock}</div>
            <div className="stat-label">In Stock</div>
          </div>
          <div className="stat-card stat-red">
            <div className="stat-value">{outStock}</div>
            <div className="stat-label">Out of Stock</div>
          </div>
          <div className="stat-card stat-orange">
            <div className="stat-value">{dealCount}</div>
            <div className="stat-label">Active Deals</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="admin-toolbar">
          <h1>Products Management</h1>
          <div className="admin-toolbar-right">
            <input
              className="admin-search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="admin-filter"
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <button className="admin-add-btn" onClick={openAdd}>
              + Add Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-wrap">
          {loading ? (
            <div className="table-empty">Loading products…</div>
          ) : visible.length === 0 ? (
            <div className="table-empty">
              {products.length === 0
                ? 'No products yet. Click "Add Product" to get started!'
                : 'No products match your filters.'}
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Section</th>
                  <th>Badge</th>
                  <th>In Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.image_url ? (
                        <img className="table-img" src={p.image_url} alt={p.name} />
                      ) : (
                        <div className="table-img-placeholder">📦</div>
                      )}
                    </td>
                    <td className="table-name">{p.name}</td>
                    <td style={{ textTransform: 'capitalize' }}>{p.category}</td>
                    <td className="table-price">
                      KES {p.price.toLocaleString()}
                      {p.orig_price && (
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          KES {p.orig_price.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{p.section}</td>
                    <td>
                      <span className={`table-badge ${p.badge ? `badge-${p.badge}` : 'badge-none'}`}>
                        {p.badge ?? '—'}
                      </span>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="stock-toggle"
                        checked={p.in_stock}
                        onChange={() => toggleStock(p)}
                        title={p.in_stock ? 'Click to mark out of stock' : 'Click to mark in stock'}
                      />
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="edit-btn" onClick={() => openEdit(p)}>Edit</button>
                        <button className="delete-btn" onClick={() => setDeleteId(p.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Form Panel */}
      <div className={`form-overlay${showForm ? ' open' : ''}`} onClick={closeForm} />
      <div className={`form-panel${showForm ? ' open' : ''}`}>
        <div className="form-panel-header">
          <span className="form-panel-title">{editingId ? 'Edit Product' : 'Add New Product'}</span>
          <button className="form-close" onClick={closeForm}>✕</button>
        </div>
        <div className="form-body">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              placeholder="e.g. Samsung Galaxy S25"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (KES) *</label>
              <input
                type="number"
                placeholder="e.g. 85000"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                min={0}
              />
            </div>
            <div className="form-group">
              <label>Original Price (KES)</label>
              <input
                type="number"
                placeholder="Leave blank if not on sale"
                value={form.orig_price}
                onChange={(e) => setForm((f) => ({ ...f, orig_price: e.target.value }))}
                min={0}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ProductCategory }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Section *</label>
              <select
                value={form.section}
                onChange={(e) => setForm((f) => ({ ...f, section: e.target.value as ProductSection }))}
              >
                {SECTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Badge</label>
              <select
                value={form.badge ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value as ProductBadge | '' }))}
              >
                <option value="">No Badge</option>
                <option value="new">New</option>
                <option value="sale">Sale</option>
              </select>
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 28 }}>
              <input
                type="checkbox"
                id="in_stock"
                checked={form.in_stock}
                onChange={(e) => setForm((f) => ({ ...f, in_stock: e.target.checked }))}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
              <label htmlFor="in_stock" style={{ marginBottom: 0, cursor: 'pointer' }}>In Stock</label>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Brief product description…"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <div className="image-upload-area" onClick={() => document.getElementById('img-input')?.click()}>
              <input
                id="img-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label className="image-upload-label" htmlFor="img-input">
                {imagePreview ? '📷 Click to change image' : '📷 Click to upload image'}
              </label>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              )}
              {uploading && <div className="upload-progress">Uploading…</div>}
            </div>
            <div style={{ marginTop: 10 }}>
              <input
                type="url"
                placeholder="Or paste image URL (e.g. from Unsplash)"
                value={imageFile ? '' : form.image_url}
                onChange={(e) => {
                  setForm((f) => ({ ...f, image_url: e.target.value }))
                  setImagePreview(e.target.value)
                  setImageFile(null)
                }}
              />
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button className="cancel-btn" onClick={closeForm}>Cancel</button>
          <button className="save-btn" onClick={handleSave} disabled={saving || uploading}>
            {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-icon">🗑️</div>
            <h3>Delete Product?</h3>
            <p>This action cannot be undone. The product will be permanently removed from your store.</p>
            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="modal-confirm-btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Toast */}
      <div className={`admin-toast ${toast.type}${toast.show ? ' show' : ''}`}>
        {toast.msg}
      </div>
    </div>
  )
}
