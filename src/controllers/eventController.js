//auth for signIn , LogIn, verification
//event for main logic 
//booking for transactional
// controllers/event.controller.js

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";
import e from "express";
import { Booking } from "../models/booking.model.js";
import { sendEmail } from "../utils/sendMail.js";
const createEvent = asyncHandler(async(req,res)=>{

    const {
        title,
        description,
        venue,
        startDate,
        endDate,
        ticketPrice,
        totalSeats,
        category,
        status
    } = req.body;


    const fields = {
        title,
        description,
        venue,
        startDate,
        endDate,
        ticketPrice,
        totalSeats,
        category,
        status
    };


    const missingFields = Object.entries(fields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);


    if(missingFields.length > 0){
        throw new ApiError(
            400,
            `Missing fields: ${missingFields.join(", ")}`
        );
    }


    if(new Date(startDate) >= new Date(endDate)){
        throw new ApiError(
            400,
            "End date must be greater than start date"
        );
    }


    if(Number(totalSeats) <= 0){
        throw new ApiError(
            400,
            "Total seats must be greater than zero"
        );
    }


    const event = await Event.create({
        title: title.trim(),
        description: description.trim(),
        category,
        venue,
        startDate,
        endDate,
        ticketPrice: ticketPrice || 0,
        totalSeats,
        organiser: req.user._id,
        bookedSeats: 0,
        status: status || "pending"
    });


    


const createdEvent = await Event.findById(event._id).populate("organiser" , "username email")

return res.status(200).json(new ApiResponse(200,createdEvent,"Event created Successfully"));
        
});


const getAllEvents = asyncHandler(async(req,res)=>{
    const {
        page = 1,
        limit = 10,
        category,
        search
    }= req.query

    const query = {}

    if(category){
        query.category = category;
    }

    if(search){
        query.title = {
            $regex : search,
            $options : "i"
        };
    }

    const events = await Event.find(query).
    populate("organiser", "username email").
    skip((page - 1)*limit).
    limit(Number(limit)).
    sort({startDate : 1})

    res.status(200).json(events);

})
const updateEvent = asyncHandler(async(req,res)=>{
    const {eventId} = req.params

    const {
        title,
        description,
        startDate,
        endDate,
        venue,
        ticketPrice,
        totalSeats,
        category
    } = req.body

    const event = await Event.findById(eventId)

    if(!event){
        throw new ApiError(404, "Event does not exists")
    }

    if(event.organiser.toString()!==req.user._id.toString()){
        throw new ApiError(403, "You are not allowed to update this event")
    }

    if(startDate && endDate){
        if(new Date (startDate) >= new Date(endDate)){
            throw new ApiError(400,"End date must be greater than start date")
        }
    }


    const updatedEvent = await Event.findByIdAndUpdate(
        eventId, {
            $set : {
                ...(title && {title : title.trim()}),
                ...(description && {description : description.trim()}),
                ...(startDate && {startDate}),
                ...(category && {category}),
                ...(endDate && {endDate}),
                ...(ticketPrice !==undefined && {ticketPrice}),
                ...(totalSeats !==undefined && {totalSeats}),
                ...(venue && {venue})

            }

    },
    {
        new : true
    }

)

return res.status(200).json(new ApiResponse(200,updatedEvent, "Event updated successfully"))
})

const deleteEvent = asyncHandler(async(req,res)=>{
    const {eventId} = req.params

    const event = await Event.findById(eventId);
    if(!event){
        throw new ApiError(404,"Event not found")
    }

    if(event.organiser.toString() !== req.user._id.toString()){
        throw new ApiError(403, "You are not allowed to delete this event")
    }

    await Event.findByIdAndDelete(eventId)
    return res.status(200).json(new ApiResponse(200,{}, "Event deleted successfully"))
})


const bookEvent = asyncHandler(async(req,res)=>{
    const {eventId} = req.params
    const {tickets = 1} = req.body
  

    const event = await Event.findById(eventId)
    if(!event){
        throw new ApiError(404,"Event not found")
    }
    if(event.status!== "Approved"){
        throw new ApiError(400, "Event is not available for booking")
    }

    
const totalPrice = Number(event.ticketPrice) * Number(tickets);
    if(event.organiser.toString() === req.user._id.toString()){
        throw new ApiError(
            400,
            "Organizer cannot book own event"
        );
    }


    const existingBooking = await Booking.findOne({
        user: req.user._id,
        event: eventId
    });


    const currentTickets = existingBooking
        ? existingBooking.tickets
        : 0;


    const totalRequiredSeats = currentTickets + tickets;


    if(event.bookedSeats + tickets > event.totalSeats){
        throw new ApiError(
            400,
            "Not enough seats available"
        );
    }


    let booking;

if(existingBooking){

    existingBooking.tickets += Number(tickets);

    existingBooking.totalAmount =
        Number(existingBooking.totalAmount || 0) + Number(totalPrice);

    booking = await existingBooking.save();




    }else{

        booking = await Booking.create({
            user: req.user._id,
            event: eventId,
            tickets,
            totalAmount : totalPrice
        });

    }


    event.bookedSeats += tickets;

    await event.save();

    //confirmation email
    await sendEmail({
        to : req.user.email,
        subject : "Event booking confirmed",
        message:
        `
    Hello ${req.user.username},

    Your booking is confirmed.

    Event: ${event.title}

    Tickets: ${tickets}

    Total Amount: ₹${totalPrice}

    Venue: ${event.venue}

    Date: ${event.startDate}

    Thank you for booking with EventX.
    `
    })



    return res.status(200).json(
        new ApiResponse(
            200,
            booking,
            existingBooking
                ? "Additional seats booked successfully"
                : "Event booked successfully"
        )
    );

})


const listAllEvents = asyncHandler(async (req, res) => {

    const events = await Event.find({
        status: "approved"
    })
    .populate("organiser", "username email")
    .sort({ createdAt: -1 });


    if(!events){
        throw new ApiError(
            404,
            "No events found"
        );
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            events,
            "Events fetched successfully"
        )
    );

});

const getEventDetails = asyncHandler(async (req, res) => {

    const { eventId } = req.params;


    const event = await Event.findById(eventId)
        .populate("organiser", "username email");


    if(!event){
        throw new ApiError(
            404,
            "Event not found"
        );
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            event,
            "Event details fetched successfully"
        )
    );

});
const getOrganizerEvents = asyncHandler(async (req, res) => {

    const events = await Event.find({
        organiser: req.user._id
    })
    .populate("organiser", "username email")
    .sort({ createdAt: -1 });


    if(events.length === 0){
        throw new ApiError(
            404,
            "No events found"
        );
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            events,
            "Organizer events fetched successfully"
        )
    );

});

const getUserBookings = asyncHandler(async (req, res) => {

    const bookings = await Booking.find({
        user: req.user._id
    })
    .populate(
        "event",
        "title description venue startDate endDate ticketPrice category"
    )
    .sort({ createdAt: -1 });


    if(bookings.length === 0){
        throw new ApiError(
            404,
            "No bookings found"
        );
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            bookings,
            "User bookings fetched successfully"
        )
    );

});

const cancelTicket = asyncHandler(async (req, res) => {

    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if(!booking){
        throw new ApiError(
            404,
            "Booking not found"
        );
    }

    if(booking.user.toString() !== req.user._id.toString()){
        throw new ApiError(
            403,
            "You cannot cancel this booking"
        );
    }


    const event = await Event.findById(booking.event);

    if(event){

        event.bookedSeats -= booking.tickets;

        await event.save();

    }

     booking.status = "cancelled";

     await booking.save();


    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Ticket cancelled successfully"
        )
    );

});

//create admin dashboard showing revenue
//otp verification
//event history of the user 
const getBookingHistory = asyncHandler(async(req,res)=>{
    const bookings = await Booking.find({
        user : req.user._id
    }).populate("event","title venue startDate endDate ticketPrice").sort({
        createdAt : -1
    })


return res.status(200).json( new ApiResponse(200, "Booking history fetched successfully"))
})
export {createEvent, updateEvent , deleteEvent, bookEvent,getAllEvents, getEventDetails,getOrganizerEvents,getUserBookings, cancelTicket,getBookingHistory}

