import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js'
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from '../controller/roomsController.js'

const router = express.Router()

router.get('/', getRooms)
router.get('/:id', getRoom)

router.post('/:id', verifyAdmin, createRoom)
router.put('/:id', verifyAdmin, updateRoom)
router.put('/updateAvailability/:id', updateRoomAvailability)
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom)

export default router