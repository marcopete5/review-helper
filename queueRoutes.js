const express = require('express')
const queueRouter = express.Router()
const Queue = require('./models/Queue')

queueRouter.route('/')

    .get((req, res) => {
        Queue.find((err, queue) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(queue)
        })
    })

    .post((req, res) => {
        const newQueue = new Queue(req.body)
        newQueue.save((err, queue) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(queue)
        })
    })

queueRouter.route('/:id')

    .put((req, res) => {
        Queue.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new:true, useFindAndModify: false},
            (err, queue) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send(queue)
            })        
    })

    .delete((req, res) => {
        Queue.findOneAndRemove(
            {_id: req.params.id},
            {useFindAndModify: false},
            (err, queue) => {
                if (err) return res.status(500).send(err)
                return res.status(200).send(queue)
            }
        )
    })

module.exports = queueRouter