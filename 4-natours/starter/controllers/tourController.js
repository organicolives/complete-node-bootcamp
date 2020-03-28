const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours: tours
        }
    })
}

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null
    })
}