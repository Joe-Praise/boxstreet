let Screen = require('../models/screen');
let Branch = require('../models/branch');
let Cinema = require('../models/cinema');
let Theater = require('../models/theater')
let express = require('express');
let app = express.Router()

//get all screens
app.get('/screens', async function (req, res){
    try{
        let screens = await Screen.find().populate("cinema_id", "branch_id", "theater_id");
        res.json(screens)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

//get a screen by id
app.get('/screen/:id', async function (req, res){
    try{
        let screenId = req.params.id;
        let screen = await Screen.findById(screenId);
        
        if(!screen) {
            res.status(500).json({message: "Screen not Found"})
        } else {
            res.status(500).json(screen)
        }
    } catch(err){
        res.status(500).send(err.message)
    }
})

//create a new screen
app.post('/screens', async function (req, res){
    try{
        let {cinema_id, branch_id, theater_id} = req.body;

        let cinema = await Cinema.findById(cinema_id);
        let branch = await Branch.findById(branch_id);
        let theater = await Theater.findById(theater_id);

        if(!cinema) return res.status(500).send({message: "Cinema does not exist"})
        if(!branch) return res.status(500).send({message: "Branch does not exist"})
        if(!theater) return res.status(500).send({message: "Theater does not exist"})

        let screen = new Screen(req.body);
        await screen.save();
        res.send(screen);
    } catch (err){
        res.status(500).send(err.message)
    }
})

//update a movie by id
app.put('/screens', async function (req, res){
    try{

    }catch (err){
        res.status(500).send(err.message)
    }
})

//delete a movie
app.delete('/screens', async function (req, res){
    try{
        let {id} = req.params;
        let screen = await Movie.findById(id)
    } catch (err){
        res.status(500).send(err.message)
    }
})

module.exports = app