"use client"

import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { Check } from "lucide-react"
import Image from "next/image"

export default function Solutions() {
  const [headingRef, isHeadingVisible] = useScrollAnimation()
  const [redTeamRef, isRedTeamVisible] = useScrollAnimation()
  const [blueTeamRef, isBlueTeamVisible] = useScrollAnimation()
  const [descRef, isDescVisible] = useScrollAnimation()
  const [featuresRef, isFeaturesVisible] = useScrollAnimation(0.2)

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden py-20">
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
        <div className="absolute transform rotate-45 right-[-10%] top-[0%]">
          <Image
            src="/hacksec_logo.jpeg"
            alt="HackSec"
            width={384}
            height={384}
            className="w-96 h-96 rounded-3xl opacity-30"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main heading */}
        <div
          ref={headingRef}
          className={`max-w-4xl mb-20 transition-all duration-1000 transform ${
            isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">Solutions for all cybersecurity domains.</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Red Teams Section */}
          <div
            ref={redTeamRef}
            className={`transition-all duration-1000 delay-300 transform ${
              isRedTeamVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
              <h2 className="text-4xl font-bold mb-4 text-red-500">Red Teams</h2>
              <p className="text-gray-400">
                Offensive security experts who simulate real-world cyber attacks to test your defenses.
              </p>
            </div>
          </div>

          {/* Blue Teams Section */}
          <div
            ref={blueTeamRef}
            className={`transition-all duration-1000 delay-500 transform ${
              isBlueTeamVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
              <h2 className="text-4xl font-bold mb-4 text-blue-500">Blue Teams</h2>
              <p className="text-gray-400">Defensive security specialists who protect and monitor your systems 24/7.</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          ref={descRef}
          className={`max-w-3xl mb-16 transition-all duration-1000 delay-700 transform ${
            isDescVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xl text-gray-400">
            Test and grow your skills in all penetration testing and adversarial domains, from information gathering to
            documentation and reporting.
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-1000 transform ${
            isFeaturesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Check className="text-green-500 h-6 w-6" />
            <span className="text-gray-300">Internships: Gain real-world experience.</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="text-green-500 h-6 w-6" />
            <span className="text-gray-300">Workshops & Courses: Master cutting-edge skills.</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="text-green-500 h-6 w-6" />
            <span className="text-gray-300">Events & Competitions: Showcase your talents.</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="text-green-500 h-6 w-6" />
            <span className="text-gray-300">Leadership Roles: Grow as a Campus Ambassador.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
