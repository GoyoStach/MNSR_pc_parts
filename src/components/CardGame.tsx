import { useRef } from "react"
import { GameCard } from "@/components/GameCard"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

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
  const { toast, toasts, removeToast } = useToast()
  const cardRefs = useRef<{ [key: string]: any }>({})

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
          toast({
            variant: "success",
            title: "Correct!",
            description: `You found the ${part.data.title}!`
          })
        } else {
          toast({
            variant: "success", 
            title: "Already revealed",
            description: `${part.data.title} is already shown`
          })
        }
        found = true
      }
    })

    if (!found) {
      toast({
        variant: "destructive",
        title: "Incorrect guess",
        description: `"${inputValue}" is not a valid PC part`
      })
    }

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
        {pcParts.slice(0, 6).map((part) => (
          <GameCard
            key={part.slug}
            title={part.data.title}
            description={part.data.description}
            slug={part.slug}
            ref={(el) => cardRefs.current[part.slug] = el}
          />
        ))}
      </div>
      <Toaster toasts={toasts} onRemove={removeToast} />
    </>
  )
}