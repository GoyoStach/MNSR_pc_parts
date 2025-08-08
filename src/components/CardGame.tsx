import { GameCard } from "@/components/GameCard"
import { useRef, useState, useEffect } from "react"

interface PcPart {
  slug: string
  data: {
    title: string
    description: string
    id: number
  }
}

interface CardGameProps {
  pcParts: PcPart[]
  onWrongId?: (title: string) => void
  onGuessError?: (message: string, type: "success" | "error") => void
}

export function CardGame({ pcParts, onWrongId, onGuessError }: CardGameProps) {
  const cardRefs = useRef<{ [key: string]: any }>({})
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "id_error" | "">("")
  const [revealedCards, setRevealedCards] = useState<Set<string>>(new Set())
  const [allRevealed, setAllRevealed] = useState(false)

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedRevealedCards = localStorage.getItem('revealedCards')
    const savedAllRevealed = localStorage.getItem('allRevealed')
    
    if (savedRevealedCards) {
      setRevealedCards(new Set(JSON.parse(savedRevealedCards)))
    }
    
    if (savedAllRevealed === 'true') {
      setAllRevealed(true)
      // Reveal all cards
      const allSlugs = pcParts.map(part => part.slug)
      setRevealedCards(new Set(allSlugs))
    }
  }, [pcParts])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('revealedCards', JSON.stringify([...revealedCards]))
  }, [revealedCards])

  useEffect(() => {
    localStorage.setItem('allRevealed', allRevealed.toString())
  }, [allRevealed])

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
          // Add to revealed cards
          setRevealedCards(prev => new Set([...prev, part.slug]))
          const message = `Correct! You found the ${part.data.title}!`
          if (onGuessError) {
            onGuessError(message, "success")
          } else {
            setFeedbackMessage(message)
            setFeedbackType("success")
          }
        } else {
          const message = `Already revealed: ${part.data.title}`
          if (onGuessError) {
            onGuessError(message, "success")
          } else {
            setFeedbackMessage(message)
            setFeedbackType("success")
          }
        }
        found = true
      }
    })

    if (!found) {
      const message = `"${inputValue}" is not a valid PC part`
      if (onGuessError) {
        onGuessError(message, "error")
      } else {
        setFeedbackMessage(message)
        setFeedbackType("error")
        // Clear feedback after 3 seconds
        setTimeout(() => {
          setFeedbackMessage("")
          setFeedbackType("")
        }, 3000)
      }
    }

    if (input) input.value = ''
  }

  const handleRevealAll = () => {
    const allSlugs = pcParts.map(part => part.slug)
    setRevealedCards(new Set(allSlugs))
    setAllRevealed(true)
    setFeedbackMessage("All cards revealed!")
    setFeedbackType("success")
    
    // Clear feedback after 2 seconds
    setTimeout(() => {
      setFeedbackMessage("")
      setFeedbackType("")
    }, 2000)
  }

  const handleRefresh = () => {
    setRevealedCards(new Set())
    setAllRevealed(false)
    setFeedbackMessage("Cards refreshed!")
    setFeedbackType("success")
    
    // Clear localStorage
    localStorage.removeItem('revealedCards')
    localStorage.removeItem('allRevealed')
    
    // Clear feedback after 2 seconds
    setTimeout(() => {
      setFeedbackMessage("")
      setFeedbackType("")
    }, 2000)
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
            id={part.data.id}
            isRevealed={revealedCards.has(part.slug)}
            onReveal={() => setRevealedCards(prev => new Set([...prev, part.slug]))}
            ref={(el) => cardRefs.current[part.slug] = el}
          />
        ))}
      </div>
      
      {/* Control Buttons */}
      <div className="border-t border-amber-200 pt-6 mt-8">
        <div className="flex justify-center gap-4">
          <button
            onClick={handleRevealAll}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Reveal All
          </button>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Refresh
          </button>
        </div>
      </div>
      
      {/* Feedback Message */}
      {feedbackMessage && (
        <div className="mt-4 text-center">
          <p className={`text-sm font-medium ${
            feedbackType === "success" 
              ? "text-amber-700" 
              : feedbackType === "id_error"
              ? "text-red-600"
              : "text-red-600"
          }`}>
            {feedbackMessage}
          </p>
        </div>
      )}
    </>
  )
}