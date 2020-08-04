export class CustomError extends Error {
    constructor(message) {
        super(message); // (1)
    }
}

import * as express from "express"

const router = express.Router()

router.post("/api", (req, res) => {
    const { username, password } = req.body
    try {
        if (!username.valid()) throw new CustomError("Username Invalid")
        if (!password.valid()) throw new CustomError("Password Invalid")
        res.json({ message: "OK!" })
    } catch (err) {
        if (err) res.status(406).json({ message: err.message })
    }
})