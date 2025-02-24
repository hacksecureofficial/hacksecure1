"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/main2.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Decorative Element */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] opacity-80 z-10">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle, rgba(229,225,255,0.2) 0%, rgba(167,154,255,0.1) 25%, rgba(101,78,255,0.05) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-20 flex flex-col items-start justify-center h-screen max-w-7xl mx-auto px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white font-serif leading-tight max-w-4xl"
        >
          HACK SECURE
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <Button className="bg-[#E6E1FF] text-black hover:bg-[#D1CCFF] transition-colors rounded-full px-8 py-6 text-lg">
            Learn more
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}