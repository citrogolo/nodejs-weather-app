const path = require("path")
const express = require('express')
const hbs = require("hbs")
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// define paths for express Config
const public_directoryPath = path.join(__dirname, '../public')
const views_directoryPath = path.join(__dirname, '../templates/views')

const PartialPath = path.join(__dirname, '../templates/partials')


// setup handlers for engine views
app.set('view engine', 'hbs')
app.set('views', views_directoryPath)
hbs.registerPartials(PartialPath)

// setup path for express static location
app.use(express.static(public_directoryPath))

app.get('/', (req, res) => {

    res.render('index', {
        title: "Weather app",
        name: "Milama Maw"
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: "about weather app",
        name: "Milama Maw"
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: "Help weather app",
        name: "Milama Maw",
        helptext: "Abradi lolo"
    })
})
app.get('/help/*', (req, res) => {

    res.render('404', {
        title: "Help weather app",
        errormessage: "article not found",
        helptext: "Abradi lolo",
        name: "Milama Maw"
    })
})


app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide address term'
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error
            })
        } else {
            forecast({ latitude, longitude }, (error, forcastData) => {
                if (error) {
                    res.send({
                        error
                    })
                } else {
                    res.send({
                        forecast: forcastData,
                        location,
                        address: req.query.address

                    })

                }
            })
        }

    })

    /*
       // res.send({
      //      forecast: "Its snowing ",
      //      location: "Warsaw",
       //     address: req.query.address
       // })
       */
})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    res.send({
        products: []
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: "404 ",
        errormessage: "404 PAGE NOT FOUND",
        name: "Milama Maw"
    })
})


app.listen(3000, () => {
    console.log("Server is UP ! 3000")
})