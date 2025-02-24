"use client"

import Image from "next/image"
import { useScrollAnimation } from "@/utils/useScrollAnimation"

export default function Partners() {
  const partners = [
    { name: "Partner 1", logo: "/placeholder.svg" },
    { name: "Partner 2", logo: "/placeholder.svg" },
    { name: "Partner 3", logo: "/placeholder.svg" },
    { name: "Partner 4", logo: "/placeholder.svg" },
    { name: "Partner 5", logo: "/placeholder.svg" },
    { name: "Partner 6", logo: "/placeholder.svg" },
  ]
  const [titleRef, isTitleVisible] = useScrollAnimation()
  const partnerRefs = partners.map(() => {
    const [ref, isVisible] = useScrollAnimation(0.1)
    return [ref, isVisible]
  })

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto">
        <h2
          ref={titleRef}
          className={`text-3xl font-bold text-center mb-8 transition-all duration-1000 transform ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Our Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => {
            return (
              <div
                key={index}
                ref={partnerRefs[index][0]}
                className={`flex items-center space-x-4 bg-gray-800 p-4 rounded-lg transition-all duration-1000 transform ${
                  partnerRefs[index][1] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{partner.name}</h3>
                  <p className="text-gray-400">Partner description goes here.</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

