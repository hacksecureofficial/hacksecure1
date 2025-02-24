'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const slideIn = {
  hidden: { x: -60, opacity: 0 },
  visible: { 
    x: 0,
    opacity: 1,
    transition: { duration: 0.8 }
  }
}

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-cover bg-center text-white relative" style={{ backgroundImage: "url('/hacksec_background1.png')" }}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container mx-auto px-4 py-16 md:py-24"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">About Us</h1>
          <div className="max-w-3xl mx-auto text-center text-gray-300">
            <p className="text-lg md:text-xl mb-8">
              HACK SEC focuses on empowering individuals and businesses with top-tier cybersecurity skills. We provide hands-on training and practical solutions tailored to meet the unique challenges of the digital world, helping you secure the future of with confidence. We provide a hands-on training and practical solution tailored to meet the unique challenges of the digital world, helping you secure the fututre with confidence.
            </p>
          </div>
        </motion.section>

        {/* Story Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              <p className="text-gray-300">
                1.) Provide relevant and effective training solutions.
              </p>
              <p className="text-gray-300">
                2.) Security Awareness ensuring a more secure digital world for everyone.
              </p>
              <p className="text-gray-300">
                3.) Providing services with the best quality and competitive prices.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-3az2qEzO5WP7LUJK9b5EtXmuomEUXi.jpeg"
                alt="Our mission illustration"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Partners Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container mx-auto px-4 py-16 md:py-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Partners</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Strategic Partner", "Technology Partner", "Sustainability Partner"].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * (index + 1) }}
              >
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6 space-y-4">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt={partner}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{partner}</h3>
                    <p className="text-gray-300">
                      {`Leading ${partner.toLowerCase()} initiatives with a focus on growth and sustainability.`}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image
                src="/hacksec_neon.jpg"
                alt="Our values illustration"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
              <p className="text-gray-300">
                At our core, we value transparency, innovation, and sustainability. 
                We're committed to creating positive change in our industry while 
                building lasting relationships with our partners and customers. 
                Together, we're shaping a future that we can all be proud of.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
