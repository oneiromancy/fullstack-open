const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/', (req, res, next) => {
    Person.find({})
        .select('id name number')
        .then((persons) => {
            return res.json({ persons })
        })
        .catch((error) => next(error))

    // When the response is sent in the JSON format, the toJSON method
    // of each object in the array is called automatically by the JSON.stringify method.
})

personRouter.post('/', (req, res, next) => {
    const { name, number } = req.body

    Person.findOne({ name })
        .select('id name number')
        .then((person) => {
            if (person) {
                person.number = number
                person
                    .save()
                    .then((person) => {
                        return res.json({ person })
                    })
                    .catch((error) => next(error))
            } else {
                const newPerson = new Person({ name, number })
                newPerson
                    .save()
                    .then((person) => {
                        return res.json({
                            person: {
                                id: person.id,
                                name: person.name,
                                number: person.number,
                            },
                        })
                    })
                    .catch((error) => next(error))
            }
        })
        .catch((error) => next(error))
})

personRouter.get('/:id', (req, res, next) => {
    const { id } = req.params

    Person.findById(id)
        .select('id name number')
        .then((person) => {
            if (!person) return res.status(404).end()

            return res.json({ person })
        })
        .catch((error) => next(error))
})

personRouter.put('/:id', (req, res, next) => {
    const { number } = req.body
    const updatedPerson = { number }

    const { id } = req.params

    Person.findByIdAndUpdate(id, updatedPerson, {
        new: true,
    })
        .select('id name number')
        .then((person) => {
            return res.json({ person })
        })
        .catch((error) => next(error))
})

personRouter.delete('/:id', (req, res, next) => {
    const { id } = req.params

    Person.deleteOne({ _id: id })
        .then(() => {
            return res.status(204).end()
        })
        .catch((error) => next(error))
})

module.exports = personRouter
