import { useState } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card"
import { cn } from "../lib/utils"

interface GameCardProps {
  title: string
  description: string
  slug: string
  onReveal?: () => void
}

export function GameCard({ title, description, slug, onReveal }: GameCardProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  const handleClick = () => {
    if (!isRevealed) {
      setIsRevealed(true)
      onReveal?.()
    }
  }

  // Expose reveal method for external triggering
  const reveal = () => {
    if (!isRevealed) {
      setIsRevealed(true)
      onReveal?.()
    }
  }

  // Attach reveal method to component for external access
  ;(GameCard as any).reveal = reveal

  return (
    <Card 
      className={cn(
        "aspect-[3/4] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg",
        "flex flex-col items-center justify-center p-4",
        "border-2 border-muted-foreground/20 bg-muted",
        isRevealed ? "bg-green-50 border-green-200 shadow-md" : "hover:bg-muted/80"
      )}
      onClick={handleClick}
      data-slug={slug}
      data-revealed={isRevealed}
    >
      <CardContent className="p-0 flex flex-col items-center justify-center h-full text-center">
        {!isRevealed ? (
          <div className="text-6xl font-bold text-muted-foreground/60">?</div>
        ) : (
          <div className="space-y-2">
            <CardTitle className="text-sm font-bold text-green-800 leading-tight">
              {title}
            </CardTitle>
            <CardDescription className="text-xs italic text-green-700 leading-relaxed">
              {description}
            </CardDescription>
          </div>
        )}
      </CardContent>
    </Card>
  )
}