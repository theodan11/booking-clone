import Room from '../models/rooms.js'
import Hotel from '../models/hotels.js'


export const createRoom = async (req, res, next)=>{
    const newRoom = Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        await Hotel.findByIdAndUpdate(req.params.id, {$push:{rooms: savedRoom._id}})
        res.status(200).json({"data":savedRoom})
    } catch (error) {
        next(error)
    }
}

export const deleteRoom = async(req, res, next)=>{
    try {
        await Hotel.findByIdAndUpdate(req.params.hotelId, {$pull:{rooms:req.params.id}})
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json({"message":"Room deleted successfully"})
    } catch (error) {
        next(error)
    }
}


export const updateRoom = async(req, res, next)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.status(200).json({updatedRoom, "message":"Room updated successfully"})
    } catch (error) {
        next(error)
    }
}

export const updateRoomAvailability = async(req, res, next)=>{
    try {
        const updatedRoomDate = await Room.updateOne({"roomNumbers._id":req.params.id}, {$push:{"roomNumbers.$.unAvailableDates":req.body.dates}}, {new:true})
        res.status(200).json({"message":"Room updated successfully"})
    } catch (error) {
        next(error)
    }
}


export const getRooms = async(req, res, next)=>{
    try {
        const rooms = await Room.find({})
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}

export const getRoom = async(req, res, next)=>{
    try{
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }catch (error) {
        next(error)
    }
}