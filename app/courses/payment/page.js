"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function CoursePayment() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handlePayment = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/create-order", { method: "POST" })
      const data = await response.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Your Brand",
        description: "VIP Subscription",
        order_id: data.id,
        handler: async (response) => {
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            body: JSON.stringify(response),
            headers: { "Content-Type": "application/json" },
          })
          const verificationData = await res.json()
          if (verificationData.success) {
            router.push("/courses")
          } else {
            alert("Payment verification failed")
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error("Error initiating payment:", error)
      alert("Error initiating payment. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>VIP Subscription Payment - Your Brand</title>
      </Head>
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-20 container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">VIP Subscription Payment</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Section */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Free</h2>
              <p className="text-lg mb-6">
                Access a selection of free courses and resources to kickstart your learning journey.
              </p>
            </div>

            {/* Purchase Section */}
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">VIP+</h2>
              <p className="text-lg mb-6">
                Unlock all premium content and exclusive courses for just{" "}
                <span className="text-green-400 font-bold text-3xl">$10</span>.
              </p>
              <p className="text-lg mb-6">1.) Unlock The premium data science path</p>
              <p className="text-lg mb-6">2.) Unlock Certification</p>
              <p className="text-lg mb-6">3.) Unlock test</p>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

