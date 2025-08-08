import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GameCardProps {
  title: string
  description: string
  slug: string
  id: number
  isRevealed?: boolean
  onReveal?: () => void
}

export function GameCard({ title, description, slug, id, isRevealed: propIsRevealed = false, onReveal }: GameCardProps) {
  const [localIsRevealed, setLocalIsRevealed] = useState(false)
  
  // Use prop-controlled state if provided, otherwise use local state
  const isRevealed = propIsRevealed || localIsRevealed

  // Reset local state when prop changes (for refresh functionality)
  useEffect(() => {
    if (!propIsRevealed) {
      setLocalIsRevealed(false)
    }
  }, [propIsRevealed])

  const handleClick = () => {
    if (!isRevealed) {
      if (!propIsRevealed) {
        setLocalIsRevealed(true)
      }
      onReveal?.()
    }
  }

  return (
    <Card 
      className={cn(
        "aspect-[3/4] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg",
        "flex flex-col p-4",
        "border-2 border-muted-foreground/20 bg-muted",
        isRevealed ? "bg-amber-50 border-amber-200 shadow-md cursor-default" : "hover:bg-muted/80"
      )}
      onClick={!isRevealed ? handleClick : undefined}
      data-slug={slug}
      data-revealed={isRevealed}
    >
      <CardContent className="p-0 flex flex-col h-full">
        {!isRevealed ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-6xl lg:text-7xl font-bold text-muted-foreground/60">?</div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            {/* Image placeholder */}
            <div className="w-full h-20 lg:h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs lg:text-sm">Image placeholder</span>
            </div>
            
            {/* Content */}
            <div className="space-y-3 px-2">
              <CardTitle className="text-sm lg:text-base font-bold text-amber-800 leading-tight line-clamp-2">
                {title}
              </CardTitle>
              <CardDescription className="text-xs lg:text-sm italic text-amber-700 leading-relaxed line-clamp-2">
                {description}
              </CardDescription>
            </div>
            
            {/* Learn More Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                window.location.href = `/pc-parts/${id}-${slug}`
              }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs lg:text-sm font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Learn More
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}