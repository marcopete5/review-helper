const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require("path")
const port = process.env.PORT || 5000;

app.use(express.json())
app.use('/votes', require('./voteRoutes'))
app.use('/queue', require('./queueRoutes'))
app.use(express.static(path.join(__dirname, "client", "build")))


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/review-app", { useUnifiedTopology: true, useNewUrlParser: true }).then(()=> {
    console.log('mongoose is connected')
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, ()=> console.log(`Server running on port ${port}`))