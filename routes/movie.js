let Movie = ('../models/movie');
let express = require('express');
let app = express.Router()

app.get('/movies', function (req, res){
    try{

    } catch(err){
        res.status(500).send(err.message)
    }
})

app.post('/movies', function (req, res){
    try{

    }catch(err){
        res.status(500).send(err.message)
    }
})

app.put('/movies', function (req, res){
    try{

    } catch(err){
        res.status(500).send(err.message)
    }
})

app.delete('/movies', function (req, res){
    try{

    } catch (err){
        res.status(500).send(err.message)
    }
})

module.exports = app