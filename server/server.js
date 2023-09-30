import express from 'express'
import dotenv from 'dotenv'
import ConnectDb from './Db/connection.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()
ConnectDb()

const app = express()
app.use(express.json())

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)

app.get('/api/config/paypal',(Req,res)=>
res.send(process.env.PAYPAL_CLIENT_ID)
)


app.use(notFound)

app.use(errorHandler)

app.get('/',(req,res)=>{
    res.send('api is running ....')
})


const port = process.env.PORT || 5000

app.listen(port,console.log(`server is running in ${process.env.NODE_ENV} mode on ${port} `.yellow.underline.bold ))