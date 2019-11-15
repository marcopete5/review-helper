const express = require('express')
const voteRouter = express.Router()
const Vote = require('./models/Votes')

voteRouter.route('/')
    .get((req, res) => {
        Vote.find((err, votes) => {
            if(err) return res.status(500).send(err)
            return res.status(200).send(votes)
        })
    })

    .post((req, res) => {
        const newVote = new Vote(req.body)
        newVote.save((err, vote) => {
            console.log(err)
            if(err) return res.status(500).send(err)
            return res.status(201).send(vote)
        })
    })

voteRouter.route('/:id')
    .get((req, res) => {
        Vote.findById({_id: req.params.id},(err,vote) => {
            if(err) return res.status(500).send(err)
            return res.status(200).send(vote)
        })
    })

    .put((req,res) => {
        Vote.findByIdAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, useFindAndModify: false},
            (err, vote)=>{
                if(err) return res.status(500).send(err)
                return res.status(200).send(vote)
            })
    })

module.exports = voteRouter