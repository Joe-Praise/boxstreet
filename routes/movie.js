let Movie = require('../models/movie');
let Branch = require('../models/branch');
let Cinema = require('../models/cinema')
let express = require('express');
let app = express.Router()

//get all movies
app.get('/movies', async function (req, res){
    try{
        let movies = await Movie.find().populate("cinema_id", "branch_id");
        res.json(movies)
    } catch(err){
        res.status(500).send(err.message)
    }
})

//get a branch by id
app.get('/movie/:id', async function (req, res){
    try{
        let movieId = req.params.id;
        let movie = await Movie.findById(movieId);
        
        if(!movie) {
            res.status(500).json({message: "Movie not Found"})
        } else {
            res.status(500).json(movie)
        }
    } catch(err){
        res.status(500).send(err.message)
    }
})

//create a new movie
app.post('/movies', async function (req, res){
    try{
        let {cinema_id, branch_id} = req.body;

        let cinema = await Cinema.findById(cinema_id);
        let branch = await Branch.findById(branch_id);

        if(!cinema) return res.status(500).send({message: "Cinema does not exist"})
        if(!branch) return res.status(500).send({message: "Branch does not exist"})

        let movie = new Movie(req.body);
        await movie.save();
        res.send(movie);
    }catch(err){
        res.status(500).send(err.message)
    }
})

//update a movie by id
app.put('/movie/:id', async function (req, res){
    try{

    } catch(err){
        res.status(500).send(err.message)
    }
})

//delete a movie
app.delete('/movie/:id', async function (req, res){
    try{
        let {id} = req.params;
        let movie = await Movie.findById(id)
    } catch (err){
        res.status(500).send(err.message)
    }
})

module.exports = app