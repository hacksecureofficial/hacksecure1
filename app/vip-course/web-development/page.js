'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function CybersecurityVIP() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserAccess = async () => {
      // Fetch user details (assuming a backend API or cookie)
      const res = await fetch('/api/user') // Adjust this based on your backend setup
      const userData = await res.json()

      if (!userData) {
        // If not logged in, redirect to signin page
        router.push('/signin')
        return
      }

      if (!userData.vip_subscription) {
        // If VIP subscription is not active, redirect to payment page
        router.push('/courses/payment')
        return
      }

      setLoading(false)  // Once checks pass, set loading to false
    }

    checkUserAccess()
  }, [router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>VIP Cybersecurity Course - Your Brand</title>
        <meta name="description" content="Exclusive VIP Cybersecurity course content" />
      </Head>
      <main className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">VIP Cybersecurity Course</h1>
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Advanced penetration testing techniques</li>
              <li>Malware analysis and reverse engineering</li>
              <li>Cloud security and DevSecOps</li>
              <li>Blockchain security</li>
              <li>Cyber threat intelligence</li>
            </ul>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Exclusive VIP Resources</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access to a virtual cybersecurity lab environment</li>
                <li>Exclusive workshops on emerging threats</li>
                <li>Certification exam preparation materials</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
