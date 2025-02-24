'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function TrustedBy() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      const scrollContent = scrollContainer.firstElementChild
      if (scrollContent) {
        scrollContainer.appendChild(scrollContent.cloneNode(true))
      }
    }

    const scroll = () => {
      if (scrollContainer) {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0
        } else {
          scrollContainer.scrollLeft += 1
        }
      }
    }

    const scrollInterval = setInterval(scroll, 20)

    return () => clearInterval(scrollInterval)
  }, [])

  const trustedBy = [
    { name: 'Company 1', logo: '/placeholder.svg' },
    { name: 'Company 2', logo: '/placeholder.svg' },
    { name: 'Company 3', logo: '/placeholder.svg' },
    { name: 'Company 4', logo: '/placeholder.svg' },
    { name: 'Company 5', logo: '/placeholder.svg' },
    { name: 'Company 6', logo: '/placeholder.svg' },
  ]

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Trusted By</h2>
        <div 
          ref={scrollRef}
          className="overflow-hidden whitespace-nowrap"
        >
          <div className="inline-block">
            {trustedBy.map((company, index) => (
              <div key={index} className="inline-block mx-8">
                <Image 
                  src={company.logo || "/placeholder.svg"} 
                  alt={company.name} 
                  width={100} 
                  height={50} 
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

