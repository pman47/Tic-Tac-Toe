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


router.post('/register', async (req,res)=>{
    console.log(req)
    console.log(req?.url)
    console.log(req.body)
    const body = req.body
    try{
        const existingUser = await User.findOne({$or : [ { email: body.email }, { username: body.username }]} )
        if(!!existingUser){
            const message = existingUser.email === body.email ? "User already exist with the same email Id" : "User already exist with the same Username";
            res.status(400).json({ message })
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