import React, { useContext } from 'react'
import UserContext from '../Context/UserContext'

const Loading = () => {
    const user = useContext(UserContext)
    console.log(user)
  return (
    <div className='font-Bilbo flex items-center justify-center h-screen'>
        <div className='flex items-center flex-col animate-bounce'>
            <p className='text-4xl'>async</p>
            <h1 className='text-6xl'>tic tac</h1>
            <h1 className='text-6xl'>toe</h1>
        </div>
    </div>
  )
}

export default Loading