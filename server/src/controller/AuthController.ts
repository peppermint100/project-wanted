import { getRepository } from 'typeorm';
import * as express from "express"
import * as bcrypt from "bcrypt"

import { generateToken, verifyToken } from './../service/JwtService';
import { encode, compare } from './../service/BcryptService';
import { loginRequest } from '../types/auth';
import { registerRequest } from "../types/auth";

import db from "./../db"
import { User } from "./../entity"
import { CustomError } from "./../exception/customError"


const router = express.Router()

router.post('/', (req, res) => {
    const { email, token } = req.headers
    db.then(async connection => {
        try {
            const userExisting = await User.findOne({ email: email.toString() })
            const slicedToken = token.toString().substring(7,)
            const result = verifyToken(slicedToken);
            if (email !== result.email) throw new CustomError("이메일이 올바르지 않습니다.")

            const user = {
                userID: userExisting.userId,
                username: userExisting.username,
                email: userExisting.email,
                role: userExisting.role,
                skills: userExisting.skills,
                authenticated: true
            }

            res.status(200).json({ message: "OK", authorized: true, user })
        } catch (err) {
            if (err) res.status(400).json({ err: err.message })
        }
    })
})

router.post('/signup', (req, res) => {
    const { username, email, password, confirmPassword, role, skills, description }: registerRequest = req.body;

    const clearedSkills = skills.filter(skill => skill !== "")

    db.then(async connection => {
        // username check
        const usernameExistingCount = await User.findAndCount({ where: { username } })
        if (usernameExistingCount[1] > 0) { throw new CustomError("동일한 유저 이름이 존재합니다.") }

        // email check
        const emailExistingCount = await User.findAndCount({ where: { email } })
        if (emailExistingCount[1] > 0) { throw new CustomError("동일한 유저 이메일이 존재합니다.") }

        //password confirm check
        if (password !== confirmPassword) { throw new CustomError("비밀번호가 일치하지 않습니다.") }

        // encode password
        const hashedPassword = await encode(password)
        if (hashedPassword === null) { throw new CustomError("동일한 유저 이메일이 존재합니다") }

        //save to db
        const newUser = await User.create({ username, email, password: hashedPassword, role, skills: clearedSkills, description }).save();

        res.json({ message: "You are successfully registered!", newUser, status: 200 })
    }).catch(err => res.status(400).json({ err: err.message }))
})

router.post('/login', (req, res) => {
    const { email, password }: loginRequest = req.body
    db.then(async connection => {
        // password check
        try {
            const userExisting = await User.findOne({ where: { email } })
            if (!userExisting) throw new CustomError("유저가 존재하지 않습니다.")

            const hashedPassword = userExisting.password
            const result = await compare(password, hashedPassword)
            if (!result) throw new CustomError("비밀번호가 일치하지 않습니다.")

            // create jwt
            const bearer = 'bearer '
            const token = generateToken(email)

            // return jwt
            res.json({ message: "Login Success", token: bearer.concat(token), status: 200, user: userExisting })
        } catch (err) {
            res.status(401).json({ err: err.message })
        }

    }).catch(err => console.log("db err: ", err))
})

export default router;