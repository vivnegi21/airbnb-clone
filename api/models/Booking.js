const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    place:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Places'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    checkIn:{type:Date, required:true},
    checkOut:{type:Date, required:true},
    name:{ type:String,required:true},
    phone:{ type:String,required:true},
    price:{ type:Number},
    maxGuests: Number,
})

const Booking = mongoose.model('Booking',BookingSchema);

module.exports = Booking;