const events = require('express').Router()
const db = require('../models')
const { Event, Meet_Greet, Band, Set_Times, Stage, Stage_Events } = db

// READ/SHOW ALL

events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'date', 'ASC' ] ]
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

// READ/SHOW ONE

events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {
                name: req.params.name
            },
            include: [{
                model: Meet_Greet,
                as: 'meet_greets',
                include: {
                    model: Band,
                    as: 'band'
                }
            }, {
                model: Set_Times,
                as: 'set_time',
                include: [{
                    model: Stage,
                    as: 'stage'
                }, {
                    model: Band,
                    as: 'band'
                }]
            }, {
                model: Stage,
                as: 'stages',
                through: Stage_Events
            }]
        })
        res.status(200).json(foundEvent)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

// CREATE

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(201).json({ message: 'Event created', data: newEvent })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

// UPDATE

events.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: { event_id: req.params.id }
        })
        res.status(200).json({ message: 'Event updated', data: updatedEvent})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

//DELETE

events.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: { event_id: req.params.id }
        })
        res.status(200).json({ message: 'Event deleted', data: deletedEvent})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = events