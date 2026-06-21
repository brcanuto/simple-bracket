import type { Match, Player } from "../types/tournament"

export function generateBracket(players: Player[]): Match[] {
    const rounds = Math.ceil(Math.log2(players.length))
    const matches: Match[] = []

    for (let i: number = rounds; i  >= 1; i--) {
        const matchCount = Math.pow(2, rounds - i)
        for (let j = 0; j < matchCount; j++){
            const match = {
                id: `match-${i}-${j}`,
                round: i,
                player1Id: null,
                player2Id: null,
                winnerId: null,
                nextMatchId: i === rounds ? null : `match-${i + 1}-${Math.floor(j / 2)}`,
            }
            console.log(`Round ${i}, Match ${j}, nextMatchId: ${match.nextMatchId}`)
            matches.push(match)
        }
    }
    return matches
}