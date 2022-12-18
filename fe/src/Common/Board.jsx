import { faCircleDot, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { fontColor } from './Config'
import Button from './Button'
import { useHistory } from 'react-router-dom'

const Board = ({ board, myTurn, gameTurn, game, processMove, btnText }) => {
    const [actualBoard, setActualBoard] = useState([])
    const [clickedBox,setClickedBox] = useState()
    const history = useHistory()

    useEffect(()=>{
        let tempBoard = board?.map((value,index) => ({index, value}))
        setActualBoard(
            tempBoard?.reduce(
                function (rows, key, index) { 
                    return (index % 3 === 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows;
                }, []
            )
        )
    },[board])


    return (
        <>
            <div className='bg-[#FFE79E] h-max'>
                {
                    actualBoard?.map((boxex)=>{
                        return (
                            <div className='flex w-full justify-between'>{
                                boxex?.map((box)=>{
                                    let disabled = game?.isCompleted===true || box.index === clickedBox || box.value!==0 || myTurn !== gameTurn
                                    return (
                                        <div
                                            onClick={()=>{
                                                if(!disabled){
                                                    setClickedBox(box.index)
                                                }
                                            }}
                                            className={`flex justify-center w-36 h-36 bg-white m-2 ${box.index === clickedBox ? 'border-4 border-indigo-500/50' : ''}`}>
                                            {
                                                box.value!==0 &&
                                                (myTurn === box.value ?
                                                <FontAwesomeIcon className='h-24 w-24 m-auto' icon={faXmark} style={{ color: fontColor.cross_blue }} /> : 
                                                <FontAwesomeIcon className='h-24 w-24 m-auto' icon={faCircleDot} style={{ color: fontColor.cross_blue }} />)
                                            }
                                        </div>
                                    )
                                })
                            }</div>
                        )
                    })
                }
            </div>
            {
                <div className='absolute bottom-5 w-[95%] flex ml-[2.5%] left-0'>
                    <Button text={btnText} color={fontColor.yellow} onPress={()=>{
                        if(game.isCompleted){
                            history.push('/newGame')
                        } else if (clickedBox!==undefined) {
                            processMove(clickedBox)
                            setClickedBox(undefined)
                        }
                    }} />
                </div>
            }
        </>
    )
}

export default Board