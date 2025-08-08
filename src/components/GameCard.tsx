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
  onWrongId?: (title: string) => void
}

export function GameCard({ title, description, slug, id, isRevealed: propIsRevealed = false, onReveal, onWrongId }: GameCardProps) {
  const [localIsRevealed, setLocalIsRevealed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [idInput, setIdInput] = useState("")
  
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

  const handleLearnMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowModal(true)
  }

  const handleIdSubmit = () => {
    if (parseInt(idInput) === id) {
      window.location.href = `/pc-parts/${id}-${slug}`
    } else {
      setShowModal(false)
      setIdInput("")
      onWrongId?.(title)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setIdInput("")
  }

  return (
    <>
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
                onClick={handleLearnMoreClick}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs lg:text-sm font-medium rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Learn More
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ID Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Access Verification</h3>
            <p className="text-sm text-gray-600 mb-4">Enter the 3-digit ID to access {title}</p>
            <input
              type="number"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder="Enter 3-digit ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 mb-4"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleIdSubmit()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleIdSubmit}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Enter
              </button>
              <button
                onClick={handleModalClose}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}