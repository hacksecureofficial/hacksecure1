'use client'

import { useRef, useEffect } from 'react'

export default function EventsHero() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error attempting to play video:", error)
      })
    }
  }, [])

  return (
    <div className="relative h-[50vh] overflow-hidden">
      <video 
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">Our Events</h1>
      </div>
    </div>
  )
}

