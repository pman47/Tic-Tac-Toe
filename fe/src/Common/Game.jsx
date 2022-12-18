import React from 'react'
import Button from './Button'
import { fontColor } from './Config'
import moment from 'moment'

const Game = (props) => {
    const {
        gameId,
        title,
        description,
        btnText,
        updatedAt,
        isGameCompleted
    } = props
  return (
    <div className='rounded-lg drop-shadow-2xl bg-white p-5 mb-4'>
        <h3 className='mb-2 font-bold text-2xl'>{title}</h3>
        <p className='mb-2'>{description}</p>
        <p className='mb-2'>{moment(updatedAt).format('DD MMMM YYYY, hh:mm a')}</p>
        <Button text={btnText} color={fontColor.yellow} onPress={()=>{
            console.log(gameId)
        }} />
    </div>
  )
}

export default Game