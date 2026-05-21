import CartProvider from '@/components/CartProvider'
import PromoBar from '@/components/PromoBar'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <PromoBar />
      <Header />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  )
}
