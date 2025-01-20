import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photos: {
        type: [String]
    },
    desc: {
        type: String
    },
    rating: {
        type: Number
    },
    rooms: {
        type: [String]
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured:{
        type:Boolean,
        default:false
    }




}, { timestamps: true })

export default mongoose.model('Hotel', hotelSchema)