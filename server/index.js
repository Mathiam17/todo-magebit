import express from 'express'
import cors from 'cors'
import router from './routes.js'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 5000
const app = express()

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error)
  })

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.use(express.static('dist/'))
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
