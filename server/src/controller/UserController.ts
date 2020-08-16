import { updateStatusRequest } from './../types/user';
import { User } from '../entity';
import * as express from "express"
import db from "../db"
import { CustomError } from "./../exception/customError"

const router = express.Router()

// update status
// username, description, skills
router.post("/updatestatus", (req, res) => {
    const { userId, username, role, skills, description } = req.body
    const clearedSkills = skills.filter(skill => skill !== "")

    db.then(async connection => {
        try {
            const usernameCount = await User.findAndCount({ username })
            if (usernameCount[1] > 0) throw new CustomError("이미 동일한 유저 이름이 존재합니다.")

            await User.update({ userId: parseInt(userId.toString()) }, { username, role, skills: clearedSkills, description })

            res.status(200).json({ message: "You have successfully updated your status" })
        } catch (err) {
            if (err) res.status(406).json({ message: err.message })
        }
    })
})

router.post("/getuserinfo", (req, res) => {
    const { userId } = req.body
    db.then(async connection => {
        try {
            const userExisting = await User.findOne({ userId })
            if (!userExisting) { throw new CustomError("유저가 존재하지 않습니다.") }
            res.json({ username: userExisting.username, email: userExisting.email, role: userExisting.role, skills: userExisting.skills, description: userExisting.description })
        } catch (err) {
            if (err) res.status(406).json({ message: err.message })
        }
    })
})


export default router