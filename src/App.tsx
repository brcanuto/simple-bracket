import PlayerInput from "./components/PlayerInput"
import { useState } from "react"
import type { Player, Match } from "./types/tournament"
import { generateBracket } from "./utils/bracket"
import Bracket from "./components/Bracket"

function App() {
  const [players, setPlayers] = useState<Player[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  
  const handleGenerate = () => {
   const result = generateBracket(players)
   setMatches(result)
  }

  return (

    <div>
      <h1>Simple Bracket</h1>
      <PlayerInput
        players={players}
        setPlayers={setPlayers}
        onGenerate={handleGenerate}
      />
      {matches.length > 0 && (
        <Bracket
        matches={matches}
        players={players}
        />       
      )}
    </div>
  )
}

export default App