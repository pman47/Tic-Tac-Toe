import React from 'react'
import Game from './Game'

const Games = ({ games, user }) => {
  return (
    <div className='mt-10'>
        {games.map((game)=>{
            const isUserCreator = game.creator?._id === user?._id
            const title = isUserCreator ? `Game with ${game.player.firstName}` : `Game with ${game.creator.firstName}`
            const isGameCompleted = game.isCompleted || false
            const updatedAt = game.updatedAt
            let description;
            let btnText = "View Game";
            if(isGameCompleted){
                if (game.result === "Won") {
                    if(game.whoWon === user._id) {
                        description = "You Won"
                    } else {
                        description = "You Lose"
                    }
                } else {
                    description = "Its a Draw!"
                }
            } else {
                if ( isUserCreator ) {
                    if ( game.turn === 1 ) {
                        if (game.createdAt === game.updatedAt) {
                            description = "Game isn't started yet, pls make a first move."
                        } else {
                            description = `${game.player.firstName} just made their move!. Its your turn to play now.`
                            btnText = "Play!"
                        }
                    } else {
                        description = `You have made your move!Waiting for ${game.player.firstName} to play.`
                    }
                } else {
                    if ( game.turn === 2 ) {
                        description = `${game.creator.firstName} just made their move!. Its your turn to play now.`
                        btnText = "Play!"
                    } else {
                        if ( game.createdAt === game.updatedAt) {
                            description = "Game isn't started yet, pls wait till creator make the first move."
                        } else {
                            description = `You have made your move! Waiting for ${game.creator.firstName} to play.`
                        }
                    }
                }
            }

            return <Game
                gameId={game._id}
                title={title}
                isGameCompleted={isGameCompleted}
                updatedAt={updatedAt}
                description={description}
                btnText={btnText}
            />
        })}
    </div>
  )
}

export default Games