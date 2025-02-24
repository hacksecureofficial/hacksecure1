"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Head from "next/head"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("") // Clear previous errors
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        router.push("/")
      } else {
        setError(data.error || "An error occurred during sign in")
      }
    } catch (error) {
      console.error("Sign in error:", error)
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <>
      <Head>
        <title>Sign In - Your Brand</title>
      </Head>
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-6">Sign In</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Sign In
              </button>
            </form>
            {error && <p className="mt-4 text-red-400">{error}</p>}
            <div className="mt-6 text-center">
              <Link href="/forgot-password" className="text-blue-400 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="mt-4 text-center">
              <p>
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-400 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

