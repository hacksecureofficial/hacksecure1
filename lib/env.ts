import { z } from "zod"

const envSchema = z.object({
  SMTP_FROM_EMAIL: z.string().email(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform(Number),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
})

const env = envSchema.parse({
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
})

export default env

