import {describe, it, expect} from 'vitest'
import { advanceWinner, generateBracket } from '../utils/bracket'
import type { Player } from '../types/tournament'

const createPlayers = (number:number) => {
    const players: Player[] = []
        for (let i = 0; i < number; i++){
            const player = {
            id: `player-${i}`,
            name: `player${i}`,
            weight: null,
            group: null
        }
        players.push(player)
    }
    return players
}

describe ('generateBracket', () => {
    it('should successfully create the bracket with an odd number of players', () => {
        const players = createPlayers(7)
        const result = generateBracket(players)
        expect(result.length).toBe(7)
    })
})

describe('advanceWinner', () => {
    it('puts the winner of match-1-0 in player1Id of match-2-0', () => {
        const bracket = generateBracket(createPlayers(4))
        const result = advanceWinner(bracket, 'match-1-0', 'player-0')

        const finalMatch = result.find(m => m.id === 'match-2-0')
        expect(finalMatch?.player1Id).toBe('player-0')
    })

    it('puts the winner of match-1-1 in player2Id of match-2-0', () => {
        const bracket = generateBracket(createPlayers(4))
        const result = advanceWinner(bracket, 'match-1-1', 'player-1')

        const finalMatch = result.find(m => m.id === 'match-2-0')
        expect(finalMatch?.player2Id).toBe('player-1')
    })

    it('records the winnerId on the clicked match', () => {
        const bracket = generateBracket(createPlayers(4))
        const result = advanceWinner(bracket, 'match-1-0', 'player-0')

        const clicked = result.find(m => m.id === 'match-1-0')
        expect(clicked?.winnerId).toBe('player-0')
    })

    it('does not change the original matches array', () => {
        const bracket = generateBracket(createPlayers(4))
        const before = bracket.find(m => m.id === 'match-1-1')?.winnerId
        expect(before).toBeNull()

        advanceWinner(bracket, 'match-1-1', 'player-1')

        const after = bracket.find(m => m.id === 'match-1-1')?.winnerId
        expect(after).toBeNull()
    })

    it('sets the winner on the final without advancing anywhere', () => {
        const bracket = generateBracket(createPlayers(4))
        const result = advanceWinner(bracket, 'match-2-0', 'player-0')

        const finalMatch = result.find(m => m.id === 'match-2-0')
        expect(finalMatch?.winnerId).toBe('player-0')
    })
})