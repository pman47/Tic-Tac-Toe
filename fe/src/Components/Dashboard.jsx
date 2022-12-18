import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../Common/Button'
import { fontColor } from '../Common/Config'
import Games from '../Common/Games'
import gameService from '../Services/game.service'
import TokenService from '../Services/token.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  const history = useHistory()
  const [user,setUser] = useState()
  const [games,setGames] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(()=>{
    setUser(TokenService.getUser())
  },[])
  
  useEffect(()=>{
    const fetchGames = async () => {
      setLoading(true)
      try {
        console.log(user)
        const allGames = await gameService.fetchGames(user._id)
        setGames(allGames)
      } catch(error) {
        console.log(error.response?.data)
      }
      setLoading(false)
    }
    fetchGames()
  },[user])

  const createNewGame = () => {
    history.push('/newGame')
  }

  return (
    <div className='relative p-5 h-full overflow-hidden overflow-y-scroll scrollbar-hide'>
      <div className='flex flex-row justify-between align-middle my-2'>
        <p className='font-bold text-3xl'>Your Games</p>
        <button className='font-bold text-lg' onClick={()=>{
          TokenService.removeUser()
          history.push('/')
        }}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
        </button>
      </div>
      {
        isLoading ?
          <Loading />
        : games.length === 0 ?
          <NoGameFound onPress={createNewGame} />
        : (
          <>
            <Games games={games} user={user} />
          </>
        )
      }
      {!isLoading && games.length > 0 && (
        <div className='fixed bottom-5'>
          <button className='ml-2 h-14 drop-shadow-xl rounded-lg text-white font-bold bg-[#270F36] px-5'
          onClick={createNewGame}>
            + New Game
          </button>
        </div>
      )}
    </div>
  )
}

export default Dashboard


const Loading = () => {
  return (
    <div className='flex items-center flex-col h-5/6 justify-center align-middle gap-7 animate-pulse'>
      <h1 className='text-6xl font-Bilbo'>Loading</h1>
    </div>
  )
}


const NoGameFound = ({onPress}) => {
  return (
    <div className='flex items-center flex-col h-5/6 justify-center align-middle gap-7'>
      <h1 className='text-6xl font-Bilbo'>No Games</h1>
      <h1 className='text-6xl font-Bilbo'>Found</h1>
      <Button text={"Start a new game"} color={fontColor.yellow} onPress={onPress} />
    </div>
  )
}