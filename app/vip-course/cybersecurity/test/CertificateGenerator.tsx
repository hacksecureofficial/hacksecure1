"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

interface CertificateData {
  firstName: string
  lastName: string
  date: string
  userId: string
}

interface CertificateGeneratorProps {
  certificateData: CertificateData
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ certificateData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = "/certification.webp" // Path to your certificate background image
    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width
      canvas.height = img.height

      // Draw the certificate background
      ctx.drawImage(img, 0, 0)
      ctx.fillStyle = theme === "dark" ? "white" : "black"

      // Full Name
      ctx.font = "24px Arial" // Adjust the font size here
      ctx.textAlign = "center"
      const fullName = `${certificateData.firstName} ${certificateData.lastName}`
      ctx.fillText(fullName, canvas.width / 2, canvas.height / 2 - 50) // Adjust position here

      // Date
      ctx.font = "12px Arial" // Adjust the font size here
      ctx.textAlign = "right" // Align the date to the right
      ctx.fillText(
        `Date: ${certificateData.date}`,
        canvas.width - ctx.measureText(`Date: ${certificateData.date}`).width - 20, // Align 20px from the right
        canvas.height - 20 // Align 20px from the bottom
      );
      // Convert canvas to an image URL and save it
      const dataUrl = canvas.toDataURL()
      setImageUrl(dataUrl)
      saveCertificate(dataUrl)
    }
  }, [certificateData, theme])

  // Function to save the certificate to the server
  const saveCertificate = async (imageUrl: string) => {
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...certificateData,
          imageUrl,
        }),
      })

      if (response.ok) {
        console.log("Certificate saved successfully!")
      } else {
        throw new Error("Failed to save certificate")
      }
    } catch (error) {
      console.error("Error saving certificate:", error)
    }
  }

  // Function to handle downloading the certificate
  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a")
      link.download = `certificate-${certificateData.userId}.png`
      link.href = imageUrl
      link.click()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">Your Certificate</h1>
      <canvas ref={canvasRef} className="border border-gray-300 shadow-lg" />
      <div className="mt-4 space-x-4">
        <Button onClick={handleDownload}>Download Certificate</Button>
        <Button onClick={() => router.push("/certificates")}>View All Certificates</Button>
      </div>
    </div>
  )
}

export default CertificateGenerator
