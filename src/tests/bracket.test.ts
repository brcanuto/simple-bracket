import {describe, it, expect} from 'vitest'
import { generateBracket } from '../utils/bracket'
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