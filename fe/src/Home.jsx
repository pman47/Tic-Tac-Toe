import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from './Common/Button'
import { fontColor } from './Common/Config'

const Home = () => {
    const history = useHistory()
    const goToLogin = () => {
        history.push('/login');
    }
    const goToRegister = () => {
        history.push('/register');
    }
  return (
    <div className='flex align-middle flex-col p-5 h-screen justify-end relative'>
        <div className='flex items-center flex-col font-Bilbo absolute h-full z-0 w-full left-0 top-0 justify-center align-middle'>
            <p className='text-6xl'>async</p>
            <h1 className='text-8xl'>tic tac</h1>
            <h1 className='text-8xl'>toe</h1>
        </div>
        <div className='mb-3 z-10'>
            <Button text={'Login'} color={fontColor.yellow} onPress={goToLogin} />
        </div>
        <Button text={'Register'} color={fontColor.blue} onPress={goToRegister} />
    </div>
  )
}

export default Home