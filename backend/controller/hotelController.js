import Hotel from '../models/hotels.js'
import Room from '../models/rooms.js'


export const createHotel = async (req, res, next) => {
    const newHotel = await Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({ "message": "Deleted successfully" })
    } catch (error) {
        next(error)
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        next(error)
    }
}

export const getHotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query


    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gte: min || 1, $lte: max || 99999 }
        }).limit(limit)
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

export const countByCities = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map((city) => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)

    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotel" })
        const apartmentsCount = await Hotel.countDocuments({ type: "Apartment" })
        const resortsCount = await Hotel.countDocuments({ type: "Resort" })
        const villasCount = await Hotel.countDocuments({ type: "Villa" })
        const cabinCount = await Hotel.countDocuments({ type: "Cabin" })

        res.status(200).json([
            { type: "Hotels", count: hotelCount },
            { type: "Apartments", count: apartmentsCount },
            { type: "Resorts", count: resortsCount },
            { type: "Villas", count: villasCount },
            { type: "Cabins", count: cabinCount }
        ])
    } catch (error) {
        next(error)
    }
}


export const getHotelRoom = async (req, res, next) => {
    const hotelId = req.params.id
    try {
        const hotel = await Hotel.findById(hotelId)
        let list = await Promise.all(hotel.rooms.map((room)=>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }

}


