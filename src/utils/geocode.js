const request = require("request");

const geocode = (address, callback) => {
    const geocodeURL =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidW1hbmcyNTExIiwiYSI6ImNrYmx4bzh2cjBmcWwyeHBvYzUwdzlvOGQifQ.3-4DJkMv7BPXGW_4Y9UUZg&limit=1";
    request({ url: geocodeURL, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connnet to location services.')
        } else if (body.features.length === 0) {
            callback("Unable to find the location.");
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            callback(undefined,{latitude,longitude,location:body.features[0].place_name})
        }
    });
};

module.exports = geocode