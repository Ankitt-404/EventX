import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
    title : String,
    description : String,
    category : {
        type : String,
        enum : [
            "Music",
            "Education",
            "Sports",
            "Bussiness",
            "Tech",
            "Comedy"
        ]
    },
    venue : String,
    startDate : Date,
    endDate : Date,
    ticketPrice : Number,
    totalSeats : Number,
    bookedSeats : {
        type : Number,
        default : 0
    }, 
   banner: {
  url: String,
  publicId: String,
},
    status : {
        type : String,
        enum : [
            "pending",
            "draft",
            "Approved",
            "Cancelled",
            "Rejected"
        ],
        default : "pending"
    },

    organiser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
    
},
{
    timestamps : true
}
);

export const Event = mongoose.model("Event" , eventSchema);