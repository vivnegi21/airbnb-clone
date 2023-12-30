const mongoose = require('mongoose');

//defining a schema for places.
const placesSchema = mongoose.Schema({
    owner:{ //the owner of the place, storing the OBjectId reference to User.
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:String,       //title of the place.
    address:String,     //the address of the place.
    photos:[String],    //Array of photo URLs.
    description:String, //description of the places.
    perks:[String],       //string of additional perks.
    extraInfo:String,   //any extra info about the place.
    checkIn:String,     //chechin time.
    checkOut:String,    //checkout time.
    maxGuests: Number,  //max number of guest allower.
    price_per_night:Number,
});

//creating a model called "pplaces" with the schema defined above.
const Places = mongoose.model('Places',placesSchema);

module.exports = Places;