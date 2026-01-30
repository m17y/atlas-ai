import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Featured from '@/components/Featured'
import Trending from '@/components/Trending'
import Categories from '@/components/Categories'
import Latest from '@/components/Latest'
import Insights from '@/components/Insights'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Featured />
      <Trending />
      <Categories />
      <Latest />
      <Insights />
      <Footer />
    </main>
  )
}
