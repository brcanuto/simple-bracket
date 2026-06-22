import { useState } from "react"
import type { Player } from "../types/tournament"

function PlayerInput() {
    const [inputValue, setInputValue] = useState("")
    const [players, setPlayers] = useState<Player[]>([])

    const handleAddPlayers = () => {
        if (inputValue.trim() === '') return
        setPlayers(prevPlayers => [...prevPlayers, {
            id: crypto.randomUUID(),
            name: inputValue.trim(),
            weight: null,
            group: null
        }])
        setInputValue('')
    }
    return(
        <div>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddPlayers()
                }}
            />
            <button onClick={handleAddPlayers}>
                Add Player
            </button>
            <ul>
                {players.map(player => (
                <li key={player.id}>{player.name}</li>
                ))}
            </ul>
            {players.length >= 2 && <button>Generate Bracket</button>}
        </div>
    )
}

export default PlayerInput