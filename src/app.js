const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const hbs = require("hbs");
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Umang Patel",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide address term",
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) return res.send({ error });
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) return res.send({ error });
                else
                    res.send({
                        location,
                        forecast: forecastData,
                    });
            });
        }
    );
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search term",
        });
    }
    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/help", (req, res) => {
    res.send("Help Page");
});
app.get("/help/*", (req, res) => {
    res.render("error", {
        error: "Help article not found",
    });
});

app.get("*", (req, res) => {
    res.render("error", {
        error: "Help  not found",
    });
});

app.listen(port, () => console.log("Running on 3000."));
