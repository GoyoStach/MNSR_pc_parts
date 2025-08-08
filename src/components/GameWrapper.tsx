import { useState } from "react"
import { CardGame } from "@/components/CardGame"

interface PcPart {
  slug: string
  data: {
    title: string
    description: string
    id: number
  }
}

interface GameWrapperProps {
  pcParts: PcPart[]
}

export function GameWrapper({ pcParts }: GameWrapperProps) {
  const [idErrorMessage, setIdErrorMessage] = useState("")
  const [guessErrorMessage, setGuessErrorMessage] = useState("")
  const [guessErrorType, setGuessErrorType] = useState<"success" | "error" | "">("")

  const handleWrongId = (title: string) => {
    setIdErrorMessage(`Access denied for ${title}. Incorrect ID provided.`)
    
    // Clear error after 4 seconds
    setTimeout(() => {
      setIdErrorMessage("")
    }, 4000)
  }

  const handleGuessError = (message: string, type: "success" | "error") => {
    setGuessErrorMessage(message)
    setGuessErrorType(type)
    
    // Clear error after 3 seconds
    setTimeout(() => {
      setGuessErrorMessage("")
      setGuessErrorType("")
    }, 3000)
  }

  const clearError = () => {
    setIdErrorMessage("")
    setGuessErrorMessage("")
    setGuessErrorType("")
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input 
            type="text" 
            id="gameInput" 
            placeholder="Enter PC part name..."
            className="px-4 py-3 text-base lg:text-lg border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 w-full max-w-sm lg:max-w-md bg-white/80"
            onFocus={clearError}
          />
          <button 
            id="submitBtn"
            className="px-6 py-3 text-base lg:text-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
        
        {/* Error Messages Right Below Input */}
        {(idErrorMessage || guessErrorMessage) && (
          <div className="mt-3">
            {idErrorMessage && (
              <p className="text-sm font-medium text-red-600">
                {idErrorMessage}
              </p>
            )}
            {guessErrorMessage && (
              <p className={`text-sm font-medium ${
                guessErrorType === "success" 
                  ? "text-amber-700" 
                  : "text-red-600"
              }`}>
                {guessErrorMessage}
              </p>
            )}
          </div>
        )}
      </div>
      
      <CardGame pcParts={pcParts} onWrongId={handleWrongId} onGuessError={handleGuessError} />
    </>
  )
}