import React from 'react'
import Button from './Button'
import { fontColor } from './Config'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const Game = (props) => {
  const history = useHistory()

  const {
    gameId,
    title,
    description,
    btnText,
    updatedAt
  } = props

  return (
    <div className='rounded-lg drop-shadow-2xl bg-white p-5 mb-4'>
        <h3 className='mb-2 font-bold text-2xl'>{title}</h3>
        <p className='mb-2'>{description}</p>
        <p className='mb-2'>{moment(updatedAt).format('DD MMMM YYYY, hh:mm a')}</p>
        <Button text={btnText} color={fontColor.yellow} onPress={()=>{
            history.push(`/playGame/${gameId}`)
        }} />
    </div>
  )
}

export default Game