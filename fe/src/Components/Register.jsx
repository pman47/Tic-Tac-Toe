import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import BackButton from '../Common/BackButton'
import Button from '../Common/Button'
import { fontColor } from '../Common/Config'
import UserService from '../Services/auth.service'

const Register = () => {
    const [data,setData] = useState({
        firstName: '',
        username: '',
        email: '',
        password: ''
    })

    const history = useHistory()
    const submitRef = useRef()
    // const user = useContext(UserContext)

    const onRegister = async () => {
        try{
            await UserService.register(data)
            alert('User Created Successfully')
            history.push('/login')
        } catch (error) {
            console.log(error?.response?.data)
            alert(error.response?.data?.message)
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
                <p className='font-bold font-Epilogue text-base'>Create account</p>
                <h1 className='text-3xl font-bold font-Epilogue mt-2'>Let’s get to know <br/> you better!</h1>

                <form className='mt-10' onSubmit={(e)=>{
                    e.preventDefault()
                    onRegister()
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

            <Button color={fontColor.yellow} text="register" onPress={()=>{
                submitRef.current.click();
            }}/>
        </div>
    )
}

export default Register

const fields = [
    {
        title: 'Your name',
        placeholder: 'Type your name here',
        name: 'firstName',
        type: 'text',
    },
    {
        title: 'Username',
        placeholder: 'Type your username here',
        name: 'username',
        type: 'text',
    },
    {
        title: 'Email',
        placeholder: 'Type your email here',
        name: 'email',
        type: 'email',
    },
    {
        title: 'Password',
        placeholder: 'Type your password here',
        name: 'password',
        type: 'password',
    },
]