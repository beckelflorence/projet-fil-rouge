const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const distDir = "../dist/";
const uri = "mongodb+srv://florencebkl:dieselle57@clusterflorence.jesee.mongodb.net/clusterflorence²?retryWrites=true&w=majority";
const Car = require('./model/car.model');


const app = express();
var promise = mongoose.connect(uri, { useNewUrlParser: true });

promise.then(() => {
    console.log('DB connected');
    app.listen('3000', () => {
        console.log('Listening on port 3000!');
    });
});

app.use(express.static(path.join(__dirname, distDir)));
app.use(/^((?!(api)).)*/, (req, res) => {
    res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/cars', (req, res) => {
    var newCar = new Car(req.body);

    newCar.save((err, obj) => {
        if (err) {
            console.log(err);
            return res.send(500);
        }

        res.send(obj);
    });
});

app.get('/api/cars', (req, res) => {
    Car.find({}, (err, obj) => {
        if (err) {
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});

// Le :id sera autimatiquement transofrmé par l'identifiant envoyé apr la requête xhttp
app.get('/api/cars/:id', (req, res) => {
    // Pour effectuer une recherche on va utiliser le modèle
    // BodyParser permet de conserver l'id dans req.params.id
    Car.findOne({ _id: req.params.id }, (err, obj) => {
        if (err) {
            console.log(err);
            return res.send(500);
        }

        return res.send(obj);
    })
});

app.put('/api/cars/:id', (req, res) => {
    Car.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }, (err, obj) => {
        if (err) {
            console.log(err);
            return res.send(500);
        }

        return res.send(obj);
    });
});

app.delete('/api/cars/:id', (req, res) => {
    Car.deleteOne({ _id: req.params.id }, (err, obj) => {
        if (err) {
            console.log(err);
            return res.send(500);
        }
        res.status(204).end();
    });
});