import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoute from './routes/userRoute.js'  
import authRoute from './routes/authRoute.js'
import hotelRoute from './routes/hotelRoute.js'
import roomsRoute from './routes/roomsRoute.js'

const app = express()
dotenv.config()


//middleware

app.use(cookieParser())
app.use(cors())
app.use(express.json())




//routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/hotels', hotelRoute)
app.use('/api/rooms', roomsRoute)



app.use((err, req, res, next)=>{
    const errorMessage = err.message || 'Something went wrong'
    const errorCode = err.status || 500 
    return res.status(errorCode).json({
        message:errorMessage
    })
})

const connection = async ()=>{
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGO)
        console.log('Database connected')
    } catch (error) {
        throw error
    }
}
mongoose.connection.on("disconnected", ()=>{
    console.log("Database disconnected")
})
app.listen(process.env.PORT,async ()=>{
    await connection()
    console.log(`Server is running on ${process.env.PORT}`)
})
