import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js'
import { countByCities, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel, getHotelRoom } from '../controller/hotelController.js'




const router = express.Router()


router.post('/', verifyAdmin, createHotel)
router.put('/:id', verifyAdmin, updateHotel)
router.delete('/:id', verifyAdmin, deleteHotel)

router.get('/', getHotels)
router.get('/countByCity', countByCities)
router.get('/countByType', countByType)
router.get('/room/:id', getHotelRoom)
router.get('/find/:id', getHotel)

export default router