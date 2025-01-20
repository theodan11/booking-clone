import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        requied: true
    },
    desc: {
        type: String
    },
    maxPeople: {
        type: Number,
        requied: true
    },
    roomNumbers:[ {
        number: Number,
        unAvailableDates:{type:[Date]}
    }]
}, { timestamps: true })

export default mongoose.model('Room', roomSchema)