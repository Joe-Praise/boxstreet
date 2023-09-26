let Review = require('../models/review');
let Cinema = require('../models/cinema');
let Movie = require('../models/movie');
let User = require('../models/user');
let express = require('express');
let app = express.Router()

//get all review
app.get('/', async function (req, res){
    try{
        const reviews = await Review.find().populate("cinema_id", "movie_id", "user_id");
        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//get a review by id
app.get('/:id', async function (req, res){
    try{
        const reviewId = req.params.id;
        const review = await Review.findById(reviewId);
        
        if(!review) {
            res.status(404).json({ message: "Review not Found", code:404 })
        } else {
            res.status(200).json(review)
        }
    } catch(err){
        res.status(500).json({ err: err.message })
    }
})

//create a new screen
app.post('/', async function (req, res){
    try{
        const {cinema_id, movie_id, user_id} = req.body;

        const cinema = await Cinema.findById(cinema_id);
        const movie = await Movie.findById(movie_id);
        const user = await User.findById(user_id);

        if(!cinema) return res.status(500).send({msg: "Cinema does not exist"})
        if(!movie) return res.status(500).send({msg: "Movie does not exist"})
        if(!user) return res.status(500).send({msg: "User does not exist"})

        let review = new Review(req.body);
        await review.save();
        res.send(review);
    } catch (err){
        res.status(500).json({ err: err.message });
    }
})

//update a review by id
app.put('/review/:id', async function (req, res){
    try{
        const {id} = req.params;
        const review = await Review.findById(id);

        if(!review) return res.status(404).json({msg: "This Review id does not exist", code:404 })

        let data = review._doc;
        review.overwrite({...data, ...req.body})
        review.save()

        res.send({msg: "Review has been updated", data:review})

    }catch (err){
        res.status(500).send(err.message)
    }
})

//delete a review
app.delete('/review/:id', async function (req, res){
    try{
        const {id} = req.params;
        const review = await Review.findById(id);

        if (!review) {
            res.status(404).json({ msg: "review not found", code:404 })
        } else {
            await review.deleteOne();
            res.status(200).send({msg: "review has been deleted successfully", code:200});
        }
    } catch (err){
        res.status(500).json({err: err.message})
    }
})

module.exports = app