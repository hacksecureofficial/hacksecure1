"use client"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <>
      <Head>
        <title>Forgot Password - Your Brand</title>
      </Head>
      <main className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Reset Password
              </button>
            </form>
            {message && <p className="mt-4 text-green-400">{message}</p>}
            {error && <p className="mt-4 text-red-400">{error}</p>}
            <div className="mt-6 text-center">
              <Link href="/signin" className="text-blue-400 hover:underline">
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

