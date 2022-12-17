const express = require('express')
const { checkIfWon, checkIfBoardCompleted } = require('../helper')
const { Board } = require('../models')
const router = express.Router()


router.post('/updateMove', async(req,res)=>{
    const body = req.body
    try {

        let board = await Board.findById(body.boardId)

        if (board.board[body.moveNo] === 0) {
            board.board[body.moveNo] = board.turn
        } else {
            res.status(400).json({ message: "Block is not empty" })
            return
        }

        if( body.playerId === board.creator.valueOf() && board.turn !== 1 ) {
            res.status(400).json({ message: "Move by Wrong Player"})
            return
        }else if( body.playerId === board.player.valueOf() && board.turn !== 2 ) {
            res.status(400).json({ message: "Move by Wrong Player"})
            return
        }
        if(checkIfWon(board.board, body.moveNo)){
            board.isCompleted = true
            board.result = 'Won'
            board.whoWon = body.playerId
        } else if(checkIfBoardCompleted(board.board)) {
            board.isCompleted = true
            board.result = 'Draw'
        }
        board.turn = ( board.turn === 1 ) ? 2 : 1

        const updatedBoard = await Board.findOneAndUpdate({ _id: board._id }, board ,{ new: true });
        
        res.status(200).json(updatedBoard)
    } catch(error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong" })
    }
})

router.get('/boards', async(req,res)=>{
    const body = req.body
    try {
        const allBoards = await Board.find({
            $or: [
                { creator : Object(body.id) },
                { player : Object(body.id) }
            ]
        })
        res.status(200).json(allBoards)
    } catch(error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong" })
    }
})

router.post('/new', async (req,res)=>{
    const body = req.body
    try{
        const query = {
            $and: [
                { isCompleted : false },
                {
                    $or: [
                        { $and: [ { creator: Object(body.creator) },{ player: Object(body.player) } ], },
                        { $and: [ { creator: Object(body.player) }, { player: Object(body.creator) } ], }
                    ]
                }
            ]
        };
        const isExist = await Board.find(query)

        if (isExist.length !== 0) {
            res.status(400).json({ message: 'Already Exist' })
            return 
        }

        body.turn = 1
        await Board.create(body)

        res.status(200).json({ message: 'Board Created Successfully' })
    }catch(error){
        console.log(error)
        res.status(400).json({ message: 'Something went wrong.' })
    }
})

module.exports = router