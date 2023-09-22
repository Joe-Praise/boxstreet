let mongoose = require('mongoose');
let CinemaSchema = new mongoose.Schema({
	name:{ type:String,required:true, unique:true},
	email:{ type:String,required:true, unique:true},
	phone:{ type:String,required:true },
	image:{ type:String, },
	date_created:{ type:Date, default:Date.now },
})
let Cinema = mongoose.model('cinemas',CinemaSchema);

module.exports = Cinema;