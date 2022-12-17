const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

// Routes
const routes = require('./routes')


app.set('trust proxy', true)
app.use(express.static('public'));
app.use(express.json())

app.use('',routes)



if(app.listen(process.env.PORT)){
    console.log(`Listening to port ${process.env.PORT}`)
} else {
    console.log(`SOME errors on port ${process.env.PORT}`)
}

(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true
    });
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(`Mongo Details: ${process.env.MONGODB_URL}`)
    console.log(error)
  }
})()
