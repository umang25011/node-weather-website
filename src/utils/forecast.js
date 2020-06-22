const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=665546a5170a66c8612a2953b3ac8dd4&query=${latitude},${longitude}&units=m`;
    console.log(url)
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to the forecase service");
        } else if (body.error) {
            callback("Unable to find the location.");
        } else {
            callback(undefined, {
                temprature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
            });
        }
    });
};


module.exports = forecast