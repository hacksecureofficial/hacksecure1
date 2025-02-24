import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Solutions from "./components/Solutions"
import TrustedBy from "./components/TrustedBy"
import Partners from "./components/Partners"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Solutions />
      {/* <Partners /> */}
      <TrustedBy />
      <Footer />
    </main>
  )
}

