"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import CertificateGenerator from "./CertificateGenerator"

const questions = [
  {
    id: 1,
    question: "What is the primary purpose of encryption?",
    options: ["To speed up data transfer", "To compress data", "To protect data confidentiality", "To format data"],
    correctAnswer: 0, // This is correct, as array indices start at 0
  },
  {
    id: 2,
    question: "What is the primary purpose of encryption?",
    options: ["To speed up data transfer", "To compress data", "To protect data confidentiality", "To format data"],
    correctAnswer: 1, // This is correct, as array indices start at 0
  },
  {
    id: 3,
    question: "What is the primary purpose of encryption?",
    options: ["To speed up data transfer", "To compress data", "To protect data confidentiality", "To format data"],
    correctAnswer: 2, // This is correct, as array indices start at 0
  },
  {
    id: 4,
    question: "What is the primary purpose of encryption?",
    options: ["To speed up data transfer", "To compress data", "To protect data confidentiality", "To format data"],
    correctAnswer: 3, // This is correct, as array indices start at 0
  },
  {
    id: 5,
    question: "What is the primary purpose of encryption?",
    options: ["To speed up data transfer", "To compress data", "To protect data confidentiality", "To format data"],
    correctAnswer: 0, // This is correct, as array indices start at 0
  },
  {
    id: 6,
    question: "What is the primary purpose of encryption?",
    options: ["To speed up data transfer", "To compress data", "To protect data confidentiality", "To format data"],
    correctAnswer: 1, // This is correct, as array indices start at 0
  },
  {
    id: 7,
    question: "What is the primary purpose of encryption?",
    options: ["To speed up data transfer", "To compress data", "To protect data confidentiality", "To format data"],
    correctAnswer: 2, // This is correct, as array indices start at 0
  },
  {
    id: 8,
    question: "What is the primary purpose of encryption?",
    options: ["To speed up data transfer", "To compress data", "To protect data confidentiality", "To format data"],
    correctAnswer: 3, // This is correct, as array indices start at 0
  },
  {
    id: 9,
    question: "What is the primary purpose of encryption?",
    options: ["To speed up data transfer", "To compress data", "To protect data confidentiality", "To format data"],
    correctAnswer: 0, // This is correct, as array indices start at 0
  },
  {
    id: 10,
    question: "What is the primary purpose of encryption?",
    options: ["To speed up data transfer", "To compress data", "To protect data confidentiality", "To format data"],
    correctAnswer: 1, // This is correct, as array indices start at 0
  },

  // Add more questions...
]

interface CertificateData {
  firstName: string
  lastName: string
  date: string
  score: number
  userId: string
}

export default function Test() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null)
  const [hasAttempted, setHasAttempted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showCertificate, setShowCertificate] = useState(false)

  useEffect(() => {
    const checkUserAccess = async () => {
      try {
        const res = await fetch("/api/user")
        const userData = await res.json()
        if (!userData || !userData.id) {
          router.push("/signin")
          return
        }
        setUserId(userData.id)
        if (!userData.vip_subscription) {
          router.push("/courses/payment")
          return
        }
        const attemptRes = await fetch(`/api/test-attempts?userId=${userData.id}`)
        const attemptData = await attemptRes.json()
        const previousAttempts = attemptData.attempts || []
        const hasPassed = previousAttempts.some((attempt: any) => attempt.passed)
        if (hasPassed) {
          setHasAttempted(true)
          router.push("/vip-course/cybersecurity")
        }
      } catch (error) {
        console.error("Error checking user access:", error)
      } finally {
        setIsLoading(false)
      }
    }
    checkUserAccess()
  }, [router])

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const calculateScore = () => {
    let score = 0
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score++
      }
    })
    return score
  }

  const handleSubmit = async () => {
    const score = calculateScore()
    if (!userId) return

    if (score >= 8) {
      const date = new Date().toLocaleDateString()
      setCertificateData({
        firstName: "",
        lastName: "",
        date,
        score,
        userId,
      })
      setShowResult(true)
    } else {
      alert("You didn't pass the test. Please try again.")
      window.location.reload()
    }
  }

  const handleCertificateGeneration = async (firstName: string, lastName: string) => {
    if (certificateData && userId) {
      const updatedCertificateData = {
        ...certificateData,
        firstName,
        lastName,
      }
      setCertificateData(updatedCertificateData)

      try {
        await fetch("/api/test-attempts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            score: updatedCertificateData.score,
            passed: true,
          }),
        })

        setShowCertificate(true)
      } catch (error) {
        console.error("Error saving test attempt:", error)
        alert("An error occurred while generating the certificate. Please try again.")
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    )
  }

  if (hasAttempted) {
    return (
      <div className="container mx-auto py-8 px-4 bg-background">
        <Card>
          <CardContent className="p-6">
            <p className="text-foreground text-center">You have already passed this test. You cannot take it again.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showCertificate && certificateData) {
    return <CertificateGenerator certificateData={certificateData} />
  }

  if (showResult && certificateData) {
    const score = calculateScore()
    const allCorrect = score === questions.length
    return (
      <div className="container mx-auto py-8 px-4 bg-background">
        <Card>
          <CardHeader>
            <CardTitle className={`text-3xl text-center ${allCorrect ? "text-green-600" : "text-destructive"}`}>
              {allCorrect ? "Congratulations! You completed the test!" : "Test Results"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <p className="text-foreground">
                Your score: {score} out of {questions.length}
              </p>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value
                const lastName = (form.elements.namedItem("lastName") as HTMLInputElement).value
                handleCertificateGeneration(firstName, lastName)
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
              <Button type="submit" className="w-full">
                Generate Certificate
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-background">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <Progress value={(currentQuestion + 1) * (100 / questions.length)} className="w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-foreground">{questions[currentQuestion].question}</p>
          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={(value) => handleAnswer(Number.parseInt(value))}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-foreground">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((curr) => curr - 1)}
            >
              Previous
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmit}>Submit Test</Button>
            ) : (
              <Button onClick={() => setCurrentQuestion((curr) => curr + 1)}>Next</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

