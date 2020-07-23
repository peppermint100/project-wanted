import { getRepository } from 'typeorm';
import * as express from "express"
import * as bcrypt from "bcrypt"

import { generateToken, verifyToken } from './../service/JwtService';
import { encode, compare } from './../service/BcryptService';
import { loginRequest } from '../types/auth';
import { registerRequest } from "../types/auth";

import db from "./../db"
import { User } from "./../entity"


const router = express.Router()

router.post('/', (req, res) => {
    const { email, token } = req.headers
    const slicedToken = token.toString().substring(7,)
    const result = verifyToken(slicedToken);
    console.log(result.email)
    if (email !== result.email) res.status(401).json({ message: "You need to Login" }).end()
    res.status(200).json({ message: "OK", authorized: true }).end()
})

router.post('/signup', (req, res) => {
    const { username, email, password, confirmPassword, role, skills, description }: registerRequest = req.body;

    db.then(async connection => {
        // username check
        const usernameExistingCount = await User.findAndCount({ where: { username } })
        if (usernameExistingCount[1] > 0) { res.status(401).json({ message: "Username Already Exist" }).end() }

        // email check
        const emailExistingCount = await User.findAndCount({ where: { email } })
        if (emailExistingCount[1] > 0) { res.status(401).json({ message: "Email Already Exist" }).end() }

        //password confirm check
        if (password !== confirmPassword) { res.status(401).json({ message: "Password Does not match" }).end() }

        // encode password
        const hashedPassword = await encode(password)
        if (hashedPassword === null) { res.status(401).json({ message: "Server error when encoding password" }).end() }

        //save to db
        const newUser = await User.create({ username, email, password: hashedPassword, role, skills, description }).save();

        res.status(200).json({ message: "You are successfully registered!", newUser }).end()
    }).catch(err => console.log("db err: ", err))
})

router.post('/login', (req, res) => {
    const { email, password }: loginRequest = req.body
    db.then(async connection => {
        // password check
        const userExisting = await User.findOne({ where: { email } })
        if (!userExisting) { res.status(401).json({ message: "Please Check Your Email" }).end() }
        const hashedPassword = userExisting.password
        const result = compare(password, hashedPassword)
        if (!result) { res.status(401).json({ message: "Invalid Password" }).end() }

        // create jwt
        const bearer = 'bearer '
        const token = generateToken(email)

        // return jwt
        res.status(200).json({ message: "Login Success", token: bearer.concat(token) })

    }).catch(err => console.log("db err: ", err))
})

export default router;