let Review = require('../models/review');
let Cinema = require('../models/cinema');
let Movie = require('../models/movie');
let User = require('../models/user');
let express = require('express');
let app = express.Router()

//get all review
app.get('/reviews', async function (req, res){
    try{
        let reviews = await Review.find().populate("cinema_id", "movie_id", "user_id");
        res.json(reviews)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

//get a screen by id
app.get('/review/:id', async function (req, res){
    try{
        let reviewId = req.params.id;
        let review = await Screen.findById(reviewId);
        
        if(!review) {
            res.status(500).json({message: "Review not Found"})
        } else {
            res.status(500).json(review)
        }
    } catch(err){
        res.status(500).send(err.message)
    }
})

//create a new screen
app.post('/reviews', async function (req, res){
    try{
        let {cinema_id, movie_id, user_id} = req.body;

        let cinema = await Cinema.findById(cinema_id);
        let movie = await Movie.findById(movie_id);
        let user = await User.findById(user_id);

        if(!cinema) return res.status(500).send({message: "Cinema does not exist"})
        if(!movie) return res.status(500).send({message: "Movie does not exist"})
        if(!user) return res.status(500).send({message: "User does not exist"})

        let review = new Review(req.body);
        await review.save();
        res.send(review);
    } catch (err){
        res.status(500).send(err.message)
    }
})

//update a review by id
app.put('/review/:id', async function (req, res){
    try{

    }catch (err){
        res.status(500).send(err.message)
    }
})

//delete a review
app.delete('/review/:id', async function (req, res){
    try{
        let {id} = req.params;
        let review = await Review.findById(id)
    } catch (err){
        res.status(500).send(err.message)
    }
})

module.exports = app