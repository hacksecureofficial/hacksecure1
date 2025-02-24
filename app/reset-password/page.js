"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function ResetPassword() {
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isValidToken, setIsValidToken] = useState(false)
  const [debugInfo, setDebugInfo] = useState("")
  const router = useRouter()

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token")
    if (urlToken) {
      setToken(urlToken)
      validateToken(urlToken)
    }
  }, [])

  const validateToken = async (token) => {
    try {
      setDebugInfo(`Validating token: ${token}`)
      const response = await fetch(`/api/reset-password?token=${token}`)
      const data = await response.json()
      setDebugInfo((prevInfo) => `${prevInfo}\nResponse: ${JSON.stringify(data)}`)
      if (response.ok) {
        setIsValidToken(true)
      } else {
        setError(data.error || "Invalid or expired token")
      }
    } catch (error) {
      console.error("Error validating token:", error)
      setError("An error occurred while validating the token")
      setDebugInfo((prevInfo) => `${prevInfo}\nError: ${error.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setTimeout(() => router.push("/signin"), 3000)
      } else {
        setError(data.error || "An error occurred")
      }
    } catch (error) {
      console.error("Reset password error:", error)
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password - Your Brand</title>
      </Head>
      <main className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
            {!isValidToken ? (
              <>
                <p className="text-red-400">{error || "Validating token..."}</p>
                <pre className="mt-4 p-2 bg-gray-700 rounded">{debugInfo}</pre>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-md"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-md"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Reset Password
                </button>
              </form>
            )}
            {message && <p className="mt-4 text-green-400">{message}</p>}
            {error && <p className="mt-4 text-red-400">{error}</p>}
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

