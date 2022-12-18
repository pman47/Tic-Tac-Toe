import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import BackButton from '../Common/BackButton'
import Button from '../Common/Button'
import { fontColor } from '../Common/Config'
import UserService from '../Services/auth.service'

const Login = () => {
    const [data,setData] = useState({
        firstName: '',
        username: '',
        email: '',
        password: ''
    })

    const history = useHistory()
    const submitRef = useRef()

    const onLogin = async () => {
        try{
            const userData = await UserService.login(data)
            console.log(userData)
            alert('User LoggedIn Successfully')
            history.push('/dashboard')
        } catch (error) {
            console.log(error.response.data)
            alert(error.response.data)
        }
    }

    const onBackPress = () => {
        history.push('/home')
    }

    return (
        <div className='p-5 relative flex flex-col h-full justify-between'>
            <div>
                <BackButton onBackPress={onBackPress} />
                <div className='mt-20' />
                <p className='font-bold font-Epilogue text-base'>Login</p>
                <h1 className='text-3xl font-bold font-Epilogue mt-2'>Please enter your <br />details</h1>

                <form className='mt-10' onSubmit={(e)=>{
                    e.preventDefault()
                    onLogin()
                }}>
                    {fields.map(field=>{
                        return (
                            <div className='mb-5'>
                                <p className='mb-2 font-bold font-Epilogue text-base'>{field.title}</p>
                                <input
                                    onChange={
                                        (e) => {
                                            let updatedData = data;
                                            updatedData[field.name] = e.target.value
                                            setData(updatedData)
                                        }
                                    }
                                    className='p-5 outline-none w-full bg-[#F4F4F4] rounded-lg text-base'
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required
                                />
                            </div>
                        )
                    })}
                    <input type={'submit'} ref={submitRef} hidden />
                </form>
            </div>

            <Button color={fontColor.yellow} text="login" onPress={()=>{
                submitRef.current.click();
            }}/>
        </div>
    )
}

export default Login

const fields = [
    {
        title: 'Username',
        placeholder: 'Type your username here',
        name: 'username',
        type: 'text',
    },
    {
        title: 'Password',
        placeholder: 'Type your password here',
        name: 'password',
        type: 'password',
    },
]