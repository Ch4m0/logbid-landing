import { useState } from 'react'

interface WelcomeEmailData {
  email: string
  full_name: string
  role: string
  language?: string
  company_name?: string
}

export function useSendWelcomeEmail() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendWelcomeEmail = async (data: WelcomeEmailData) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('📧 Sending welcome email...', data)
      
      // Simulate email sending - replace with actual email service
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('✅ Welcome email sent successfully')
      return { success: true }
    } catch (error: unknown) {
      console.error('❌ Error sending welcome email:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    sendWelcomeEmail,
    isLoading,
    error
  }
}
