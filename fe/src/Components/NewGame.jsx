import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import BackButton from '../Common/BackButton'
import Button from '../Common/Button'
import { fontColor } from '../Common/Config'
import UserService from '../Services/auth.service'
import gameService from '../Services/game.service'
import TokenService from '../Services/token.service'

const NewGame = () => {
    const [email,setEmail] = useState();
    const [oppUser,setOppUser] = useState();
    const [usersData,setUsersData] = useState([]);
    const [isUsersLoading, setUsersLoading] = useState(false);
    const [user,setUser] = useState()

    useEffect(()=>{
        setUser(TokenService.getUser())
    },[])

    const history = useHistory()
    const submitRef = useRef()

    const startGame = async () => {
        try{
            const userData = await gameService.newGame({ creator: user._id, player: oppUser._id })
            console.log(userData)
            alert('Game created')
        } catch (error) {
            console.log(error.response?.data)
            alert(error.response?.data)
        }
    }

    useEffect(()=>{
        const getUsers = async () =>{
            setUsersLoading(true)
            try {
                const response = await UserService.getUsersByEmail(email)
                setUsersData(response.filter(res=>res.email !== user.email))
            } catch (error) {
                setUsersData([])
                console.log(error.response)
            }
            setUsersLoading(false)
        }
        if (email) {
            getUsers()
        } else {
            setUsersData([])
        }
    },[email])

    const onBackPress = () => {
        history.push('/dashboard')
    }

    return (
        <div className='p-5 relative flex flex-col h-full justify-between'>
            <div>
                <BackButton onBackPress={onBackPress} />
                <div className='mt-20' />
                <p className='font-bold font-Epilogue text-base'>Start a new game</p>
                <h1 className='text-3xl font-bold font-Epilogue mt-2'>Whom do you want to play with?</h1>

                <form className='mt-10' onSubmit={(e)=>{
                    e.preventDefault()
                    startGame()
                }}>
                    <div className='mb-5'>
                        <p className='mb-2 font-bold font-Epilogue text-base'>{"Email"}</p>
                        <input
                            onChange={
                                (e) => {
                                    setEmail(e.target.value)
                                }
                            }
                            className='p-5 outline-none w-full bg-[#F4F4F4] rounded-lg text-base mb-10'
                            type={"text"}
                            placeholder={"Type their email here"}
                            required
                        />
                        {isUsersLoading && (
                            <p className='mb-2 font-bold font-Epilogue text-base'>Loading...</p>
                        )}
                        {usersData.length>0 && (<p className='mb-2 font-bold font-Epilogue text-base'>{"Select user"}</p>)}
                        {
                            usersData.map(player => (
                                <div className='flex flex-row justify-between p-3 outline-none w-full bg-[#F4F4F4] rounded-lg text-base mb-2' >
                                    <div>
                                        <p className='font-bold'>{player.firstName}</p>
                                        <p>{player.email}</p>
                                    </div>
                                    <input
                                        onChange={
                                            (e) => {
                                                setOppUser(player)
                                            }
                                        }
                                        className='my-auto w-5 h-5 mr-3'
                                        type={"radio"}
                                        value={player.email}
                                        required
                                        name="oppEmail"
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <input type={'submit'} ref={submitRef} hidden />
                </form>
            </div>

            <Button color={fontColor.yellow} text="start game" onPress={()=>{
                submitRef.current.click();
            }}/>
        </div>
    )
}

export default NewGame