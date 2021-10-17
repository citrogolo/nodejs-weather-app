const request = require('request')

const forecast = ({ latitude, longitude }, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c7f2eb813de9da5ffd9706e921631ea9&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            //console.log(response.body.error)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast