const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const cors = require('cors')
const path = require('path');

app.use(
  cors({
    origin: '*'
  })
)

// Routes
const routes = require('../src/routes')


app.set('trust proxy', true)
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, './public')});
})

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
