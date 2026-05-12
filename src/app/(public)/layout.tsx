import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-blue-50">
        {children}
      </main>
      <Footer />
    </>
  )
}
