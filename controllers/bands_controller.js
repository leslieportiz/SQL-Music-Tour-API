const bands = require('express').Router()
const { Op } = require('sequelize')
const db = require('../models')
const { Band, Meet_Greet, Event, Set_Times } = db

// READ/SHOW ALL

bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundBands)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

// READ/SHOW

bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: {
                name: req.params.name
            },
            include: [{
                model: Meet_Greet,
                as: 'meet_greets',
                include: {
                    model: Event,
                    as: 'event'
                }
            }, {
                model: Set_Times,
                as: 'set_time',
                include: {
                    model: Event,
                    as: 'event'
                }
            }]
        })
        res.status(200).json(foundBand)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

// CREATE

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(201).json({ message: 'Band created', data: newBand })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

// UPDATE

bands.put('/:id', async (req, res) => {
    try {
        const updatedBand = await Band.update(
            req.body, { where: { band_id: req.params.id } }
        )
        res.status(200).json({ message: 'Band updated', data: updatedBand})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

// DELETE

bands.delete('/:id', async (req, res) => {
    try {
        const deletedBand = await Band.destroy({
            where: { band_id: req.params.id }
        })
        res.status(200).json({ message: 'Band deleted', data: deletedBand })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = bands