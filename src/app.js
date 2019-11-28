const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// setup static directory to serve
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// setup handlebars engine and views location
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// listen to port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});

// supported routes
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Elton Cheung'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Elton Cheung'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'Welcome to the help page! U guh?',
        name: 'Elton Cheung'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, geolocation = {}) => {
        if (error) {
            return res.send({ error: error })
        }

        forecast(geolocation.latitude, geolocation.longitude, (error, data) => {
            if (error) {
                return res.send({error: error})
            }

            res.send({
                location: geolocation.location,
                address: req.query.address,
                forecast: data
            })
        })

    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term.'
        })
    } else {
        res.send({
            products: []
        })
    }
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Elton Cheung',
        message: 'Help article not found.'
    })
});

// last route is for errors
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Elton Cheung',
        message: 'Page not found.'
    })
});



