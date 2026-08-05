import type { Match, Player } from "../types/tournament"

export function generateBracket(players: Player[]): Match[] {
    // round up to nearest power of 2 to ensure bracket fills evenly
    const rounds = Math.ceil(Math.log2(players.length)) 
    const matches: Match[] = []
    
    for (let i: number = rounds; i  >= 1; i--) {
        // matchCount works backwards from the final round to give the correct number of matches per round
        // ex. final round gets 1 match, semis get 2, quarters get 4        
        const matchCount = Math.pow(2, rounds - i)
        for (let j = 0; j < matchCount; j++){
            const match = {
                id: `match-${i}-${j}`,
                round: i,
                player1Id: null,
                player2Id: null,
                winnerId: null,
                //final round will always be null since any other matches will populate to its parent
                nextMatchId: i === rounds ? null : `match-${i + 1}-${Math.floor(j / 2)}`,
            }
            matches.push(match)
        }
    }
    for (let i = players.length - 1; i > 0; i--) {
        // uses Fisher-Yates shuffle to randomize matches
        const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[players[i], players[randomIndex]] = [players[randomIndex], players[i]]
    }

    const round1Matches = matches.filter(m => m.round === 1)
    
    round1Matches.forEach((match, index) => {
        match.player1Id = players[index * 2]?.id ?? null
        match.player2Id = players[index * 2 + 1]?.id ?? null
    })
    return matches
}