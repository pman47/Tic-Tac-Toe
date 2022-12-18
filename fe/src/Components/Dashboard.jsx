import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../Common/Button'
import { fontColor } from '../Common/Config'
import Games from '../Common/Games'
import UserContext from '../Context/UserContext'
import gameService from '../Services/game.service'

const Dashboard = () => {
  const history = useHistory()
  const { user } = useContext(UserContext)
  const [games,setGames] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  useEffect(()=>{
    const fetchGames = async () => {
      setLoading(true)
      try {
        console.log(user)
        const allGames = await gameService.fetchGames(user._id)
        setGames(allGames)
      } catch(error) {
        console.log(error.response.data)
      }
      setLoading(false)
    }
    fetchGames()
  },[])

  const createNewGame = () => {
    history.push('/newGame')
  }

  console.log(games)
  return (
    <div className='p-5 h-full overflow-hidden overflow-y-scroll scrollbar-hide'>
      <p className='font-bold text-3xl my-2'>Your Games</p>
      {
        isLoading ?
          <Loading />
        : games.length === 0 ?
          <NoGameFound onPress={createNewGame} />
        : (
          <Games games={games} user={user} />
        )
      }
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