const express = require('express')
const router = express.Router()
const { User } = require('../models')

router.get('/login', async (req,res)=>{
    const body = req.body
    try{
        const userData = await User.findOne({ email : body.email, password: body.password })
        if(!userData){
            res.status(400).json({message: 'Enter correct details.'})
            return
        }
        res.status(200).json(body)
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
})

router.get('/get-users', async (req,res)=>{
    const email = req.body.email
    try{
        const userData = await User.find({ email : {$regex: email, $options: 'i'}}).limit(5)
        if(userData.length === 0){
            res.status(400).json({message: 'Users Not Found'})
            return
        }
        res.status(200).json(userData)
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
})


router.post('/new', async (req,res)=>{
    const body = req.body
    try{
        const existingUser = await User.findOne({email: body.email})
        if(!!existingUser){
            res.status(400).json({message: 'User already exist'})
            return 
        }
        await User.create(body)
        res.status(200).json({message: 'User Created Successfully'})
    }catch(error){
        console.log(error)
        res.status(400).json({message: 'Something went wrong.'})
    }
})

module.exports = router