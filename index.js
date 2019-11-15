const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5555;

app.use(express.json())

app.use('/votes', require('./voteRoutes'))
app.use('/queue', require('./queueRoutes'))

mongoose.connect("mongodb://localhost:27017/review-app", { useUnifiedTopology: true, useNewUrlParser: true }).then(()=> {
    console.log('mongoose is connected')
})

app.listen(port, ()=> console.log(`Server running on port ${port}`))