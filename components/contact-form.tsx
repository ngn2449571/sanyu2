"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error("送信に失敗しました")
      }

      setSubmitStatus("success")
      setName("")
      setEmail("")
      setPhone("")
      setCompany("")
      setMessage("")
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-sm">
      <CardHeader className="space-y-1 px-4 pt-6 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl">お問い合わせ</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          ご質問やご相談がございましたら、お気軽にお問い合わせください
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-6 sm:px-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm sm:text-base">
              お名前 *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="山田 太郎"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 text-base sm:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base">
              メールアドレス *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 text-base sm:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm sm:text-base">
              電話番号 *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="090-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="h-11 text-base sm:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm sm:text-base">
              会社名
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="株式会社○○"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="h-11 text-base sm:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm sm:text-base">
              お問い合わせ内容 *
            </Label>
            <Textarea
              id="message"
              placeholder="お問い合わせ内容をご記入ください"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="min-h-[120px] text-base sm:rows-6 sm:min-h-[150px]"
            />
          </div>

          {submitStatus === "success" && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md sm:p-4">
              <p className="text-green-800 text-xs sm:text-sm">
                お問い合わせを受け付けました。担当者より追って連絡いたします。
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md sm:p-4">
              <p className="text-red-800 text-xs sm:text-sm">送信に失敗しました。もう一度お試しください。</p>
            </div>
          )}

          <Button type="submit" className="w-full h-11 text-base sm:h-12" disabled={isSubmitting}>
            {isSubmitting ? "送信中..." : "送信する"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
