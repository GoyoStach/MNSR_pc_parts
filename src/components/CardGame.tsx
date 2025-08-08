import { GameCard } from "@/components/GameCard"
import { useRef, useState } from "react"

interface PcPart {
  slug: string
  data: {
    title: string
    description: string
  }
}

interface CardGameProps {
  pcParts: PcPart[]
}

export function CardGame({ pcParts }: CardGameProps) {
  const cardRefs = useRef<{ [key: string]: any }>({})
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "">("")

  const handleSubmit = () => {
    const input = document.getElementById('gameInput') as HTMLInputElement
    const inputValue = input?.value.trim().toLowerCase()
    
    if (!inputValue) return

    let found = false
    
    pcParts.forEach((part) => {
      if (inputValue === part.slug.toLowerCase()) {
        const cardElement = document.querySelector(`[data-slug="${part.slug}"]`)
        const isAlreadyRevealed = cardElement?.getAttribute('data-revealed') === 'true'
        
        if (!isAlreadyRevealed) {
          // Trigger card reveal
          cardElement?.click()
          setFeedbackMessage(`Correct! You found the ${part.data.title}!`)
          setFeedbackType("success")
        } else {
          setFeedbackMessage(`Already revealed: ${part.data.title}`)
          setFeedbackType("success")
        }
        found = true
      }
    })

    if (!found) {
      setFeedbackMessage(`"${inputValue}" is not a valid PC part`)
      setFeedbackType("error")
    }

    // Clear feedback after 3 seconds
    setTimeout(() => {
      setFeedbackMessage("")
      setFeedbackType("")
    }, 3000)

    if (input) input.value = ''
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  // Attach event listeners
  if (typeof window !== 'undefined') {
    const submitBtn = document.getElementById('submitBtn')
    const gameInput = document.getElementById('gameInput')
    
    submitBtn?.addEventListener('click', handleSubmit)
    gameInput?.addEventListener('keypress', handleKeyPress as any)
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 max-w-6xl mx-auto">
        {pcParts.slice(0, pcParts.length).map((part) => (
          <GameCard
            key={part.slug}
            title={part.data.title}
            description={part.data.description}
            slug={part.slug}
            ref={(el) => cardRefs.current[part.slug] = el}
          />
        ))}
      </div>
      
      {/* Feedback Message */}
      {feedbackMessage && (
        <div className="mt-4 text-center">
          <p className={`text-sm font-medium ${
            feedbackType === "success" 
              ? "text-amber-700" 
              : "text-red-600"
          }`}>
            {feedbackMessage}
          </p>
        </div>
      )}
    </>
  )
}