import express from "express"
import cors from "cors"
import { resolve } from "url";


const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.get('/test', (req, res) => {
    res.json({ message: 'server testing OK' }).status(200).end()
})
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})