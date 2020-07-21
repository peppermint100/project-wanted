import { generateToken } from './../service/JwtService';
import { loginRequest } from './../types/auth.d';
import { bcrypt } from 'bcrypt';
import { encode, compare } from './../service/BcryptService';
import express from "express"
import { registerRequest } from "../types/auth";
import db from "./../db"
import { User } from "../entity";

const router = express.Router()

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
        const hashedPassword = encode(password)
        if (hashedPassword === null) { res.status(401).json({ message: "Server error when encoding password" }).end() }

        //save to db
        const newUser = await User.create({ username, email, password: hashedPassword, role, skills, description }).save();
        res.status(200).json({ message: "You are successfully registered!", user: newUser }).end()
    })

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
        const token = generateToken(email)

        // return jwt
        res.status(200).json({ message: "Login Success", token })

    })
})

export default router;