const fs = require('fs')
const express = require('express')
const app = express()


app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours: tours
        }
    })
}

const getTour = (req, res) => {
    if (req.params.id > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "invalid ID"
        })
    }
    const tour = tours.find(tour => tour.id === parseInt(req.params.id))
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
}

const createTour = (req, res) => {
    const newID = tours[tours.length - 1].id + 1
    const newTour = Object.assign({
        id: newID
    }, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if (err) console.log(err)
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
}

const deleteTour = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null
    })
}

app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTour).delete(deleteTour)