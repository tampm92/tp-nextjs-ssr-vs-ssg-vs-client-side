import Header from '@/layouts/components/Header'
import Footer from '@/layouts/components/Footer'

const DefaultLayout = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      <main className="container flex min-h-screen px-4 py-20 mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default DefaultLayout