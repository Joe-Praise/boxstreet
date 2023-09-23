let Screen = ('../models/screen');
let express = require('express');
let app = express.Router()


app.get('/screens', function (req, res){
    try{

    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.post('/screens', function (req, res){
    try{
        
    } catch (err){
        res.status(500).send(err.message)
    }
})

app.put('/screens', function (req, res){
    try{

    }catch (err){
        res.status(500).send(err.message)
    }
})

app.delete('/screens', function (req, res){
    try{

    } catch (err){
        res.status(500).send(err.message)
    }
})

module.exports = app