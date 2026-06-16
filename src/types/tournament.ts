export interface Player {
    id: string
    name: string
    weight: number | null
    group: string | null
}

export interface Match {
    id: string
    player1Id: string | null
    player2Id: string | null
    round: number
    winnerId: string | null
    nextMatchId: string | null
}