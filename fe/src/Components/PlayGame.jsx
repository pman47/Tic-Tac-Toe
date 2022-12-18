import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import BackButton from '../Common/BackButton'
import gameService from '../Services/game.service'
import TokenService from '../Services/token.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faXmark } from '@fortawesome/free-solid-svg-icons'
import { fontColor } from '../Common/Config'
import Board from '../Common/Board'

const PlayGame = () => {
    const [user,setUser] = useState()
    const [oppUser, setOppUser] = useState()
    const [game,setGame] = useState()
    const [myTurnNo,setMyTurnNo] = useState()
    const { gameId } = useParams()
    const history = useHistory()


    useEffect(()=>{
        const performOperations = async () => {
            const userData = TokenService.getUser()
            if(!userData) {
                history.push('/')
            }
            if(!gameId) {
                history.push('/dashboard')
            }
            
            let gameDetails = await gameService.getGameById(gameId)
            if(userData._id === gameDetails.creator._id){
                setMyTurnNo(1)
                setOppUser(gameDetails.player)
            } else if(userData._id === gameDetails.player._id) {
                setMyTurnNo(2)
                setOppUser(gameDetails.creator)
            }
            setUser(userData)
            setGame(gameDetails)
        }

        performOperations()
    },[])

    const onBackPress = () => {
        history.push('/dashboard')
    }

    const processMove = async (move) => {
        try{
            const response = await gameService.updateMove({playerId: user._id, boardId: game._id, moveNo: move})
            console.log(response)
            setGame(response)
        }catch(error){
            console.log(error.response.data)
            alert("Something went wrong")
        }
    }

    return (
        <div className='p-5 relative h-full'>
            <BackButton onBackPress={onBackPress} />
            <div className='mt-20' />
            <h1 className='text-3xl font-bold font-Epilogue mt-2'>Game with {oppUser?.firstName}</h1>
            <p className='font-Epilogue mt-2 text-base'>Your piece</p>
            <div className='flex h-20 w-20 align-middle justify-center'>
                <FontAwesomeIcon className='mt-2 text-6xl' icon={faXmark} style={{ color: fontColor.cross_blue }} />
            </div>
            <p className='p-5 w-full bg-[#FFE79E] text-center text-xl'>Your move</p>
            {/* <FontAwesomeIcon icon={faCircleDot} style={{color: "#FF4F4F"}} /> */}
            <Board board={game?.board} myTurn={myTurnNo} gameTurn={game?.turn} game={game} processMove={processMove} />
        </div>
    )
}

export default PlayGame