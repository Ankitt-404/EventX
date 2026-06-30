import {mongoose, Schema} from "mongoose";
import jwt from "jsonwebtoken";

const bookingSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Event",
        required : true
    },
    tickets : {
        type : Number,
        default : 1
    },
    totalAmount : {
        type : Number,
        required : true
    },
    statusBooked : {
        type : String,
        enum : ["booked" , "cancelled"],
        default : "booked"
    }
})

export const Booking = mongoose.model("Booking", bookingSchema)