import type { Match, Player } from "../types/tournament"

interface BracketProps {
    matches: Match[]
    players: Player[]
}

function Bracket({matches, players}: BracketProps) {

    const uniqueRounds = [...new Set(matches.map(match => match.round))]

    return (
        <div>
                {uniqueRounds.map(round => (
                    <div key={round}>
                        <h2>Round {round}</h2>
                        {matches
                            .filter(match => match.round === round)
                            .map(match => (
                                <div key={match.id}>
                                    <span>{players.find(p => p.id === match.player1Id)?.name ?? 'TBD'}</span>
                                    <span> vs </span>
                                    <span>{players.find(p => p.id === match.player2Id)?.name ?? 'TBD'}</span>
                                </div>
                            ))
                        }
                    </div>
                ))}
        </div>
    )
}

export default Bracket 