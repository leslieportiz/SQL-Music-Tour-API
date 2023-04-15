const stages = require('express').Router()
const db = require('../models')
const { Stage, Event, Stage_Events } = db

// READ/SHOW ALL

stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll()
        res.status(200).json(foundStages)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

// READ/SHOW ONE

stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: {
                name: req.params.name
            },
            include: {
                model: Event,
                as: 'events',
                through: Stage_Events
            }
        })
        res.status(200).json(foundStage)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

// CREATE

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(201).json({ message: 'Stage created', data: newStage})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

// UPDATE

stages.put('/:id', async (req, res) => {
    try {
        const updatedStage = await Stage.update(req.body, {
            where: { stage_id: req.params.id }
        })
        res.status(200).json({ message: 'Stage updated', data: updatedStage})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

//DELETE

stages.delete('/:id', async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: { stage_id: req.params.id }
        })
        res.status(200).json({ message: 'Stage deleted', data: deletedStage})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = stages