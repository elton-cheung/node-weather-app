const request = require('request');
const keys = require('../../config/keys');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${keys.darkSky.KEY}/${latitude},${longitude}`;
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast service', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability}% chance of rain.`);
        }
    })
};

module.exports = forecast;
