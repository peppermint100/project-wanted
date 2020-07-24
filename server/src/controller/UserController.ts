import { updateStatusRequest } from './../types/user';
import { User } from '../entity';
import * as express from "express"
import db from "../db"

const router = express.Router()

// update status
// username, description, skills
router.post("/updatestatus", (req, res) => {
    const { userId, username, role, skills, description }: updateStatusRequest = req.body
    db.then(async connection => {
        const user = await User.findOne({ userId })
        const usernameCount = await User.findAndCount({ username })

        if (usernameCount[1] > 0) res.status(406).json({ message: "There's already a existing username" }).end()

        user.role = role
        user.username = username
        user.skills = skills
        user.description = description

        await connection.manager.save(user);
        res.status(200).json({ message: "You have successfully updated your status", user }).end()
    })
})


export default router