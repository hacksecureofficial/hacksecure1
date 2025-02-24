"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestRules() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUserAccess = async () => {
      try {
        const res = await fetch("/api/user")
        const userData = await res.json()

        if (!userData || !userData.id) {
          router.push("/signin")
          return
        }

        if (!userData.vip_subscription) {
          router.push("/courses/payment")
          return
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error checking user access:", error)
        setIsLoading(false)
      }
    }

    checkUserAccess()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Certification Test Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <ul className="space-y-4 list-disc pl-6">
              <li>The test consists of 10 multiple-choice questions.</li>
              <li>You must score at least 8 out of 10 to pass the certification.</li>
              <li>You have 30 minutes to complete the test.</li>
              <li>Each question has only one correct answer.</li>
              <li>You cannot go back to previous questions.</li>
              <li>Ensure you have a stable internet connection.</li>
            </ul>

            <Button className="mt-8 w-full sm:w-auto" onClick={() => router.push("/vip-course/cybersecurity/test")}>
              Start Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

