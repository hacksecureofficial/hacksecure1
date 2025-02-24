'use client'  // Ensure this file is treated as a client-side component

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'  // Make sure this import is correct
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
  vip_subscription: boolean;
}

export default function CoursesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isMounted, setIsMounted] = useState(false) // Track if the component is mounted
  const router = useRouter()  // Use the client-side router

  useEffect(() => {
    setIsMounted(true)  // Ensure the code runs only on the client side
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user')
      if (res.ok) {
        const userData: User = await res.json()
        setUser(userData)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (user !== null && isMounted) {
      if (user.vip_subscription) {
        router.push('/vipcourses')  // Redirect to VIP courses
      } else {
        router.push('/courseslist')  // Redirect to normal courses
      }
    }
  }, [user, isMounted, router])

  if (!isMounted) return null;  // Prevent rendering before the component is mounted

  return (
    <>
      <Head>
        <title>Redirecting...</title>
        <meta
          name="description"
          content="Redirecting user based on VIP subscription status."
        />
      </Head>
      <main className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="pt-20 text-center">
          <p className="text-xl">Redirecting...</p>
        </div>
        <Footer />
      </main>
    </>
  )
}
