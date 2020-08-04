import { updateStatusRequest } from './../types/user';
import { User } from '../entity';
import * as express from "express"
import db from "../db"
import { CustomError } from "./../exception/customError"

const router = express.Router()

// update status
// username, description, skills
router.post("/updatestatus", (req, res) => {
    const { userId, username, role, skills, description }: updateStatusRequest = req.body
    db.then(async connection => {
        try {
            const user = await User.findOne({ userId })
            const usernameCount = await User.findAndCount({ username })

            if (usernameCount[1] > 0) throw new CustomError("이미 동일한 유저 이름이 존재합니다.")

            user.role = role
            user.username = username
            user.skills = skills
            user.description = description

            await connection.manager.save(user);
            res.status(200).json({ message: "You have successfully updated your status", user }).end()
        } catch (err) {
            if (err) res.status(406).json({ message: err.message })
        }
    })
})

router.post("/getuserinfo", (req, res) => {
    const { userId } = req.body
    console.log(userId)
    console.log(typeof userId)
    db.then(async connection => {
        try {
            const userExisting = await User.findOne({ userId })
            if (!userExisting) { console.log("err"); throw new CustomError("유저가 존재하지 않습니다.") }
            console.log(userExisting)
            res.json({ username: userExisting.username, email: userExisting.email, role: userExisting.role, skills: userExisting.skills, description: userExisting.description })
        } catch (err) {
            if (err) res.status(406).json({ message: err.message })
        }
    })
})


export default router