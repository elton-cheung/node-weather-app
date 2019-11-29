const request = require('request');
const fs = require("fs");
const path = require("path");
if (fs.existsSync(path.join(__dirname, "../../config"))) {
    const keys = require('../../config/keys');
    var key = keys.darkSky.KEY;
} else {
    var key = process.env.darksky_key;
}



const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast service', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} and the low is ${body.daily.data[0].temperatureLow}. There is ${body.currently.precipProbability}% chance of rain.`);
        }
    })
};

module.exports = forecast;
