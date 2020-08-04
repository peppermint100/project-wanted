import * as express from "express"
import * as cors from "cors"

import { AuthController, PostController, ApplicationContoller, UserController } from "./controller"

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use("/api/auth", AuthController)
app.use("/api/post", PostController)
app.use("/api/application", ApplicationContoller)
app.use("/api/user", UserController)

app.get('/test', (req, res) => {
    res.json({ message: 'server testing OK' }).status(200).end()
})
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
