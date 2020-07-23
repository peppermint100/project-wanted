import { createPostRequest } from './../types/post';
import * as express from "express"
import db from '../db';
import { User, Post } from '../entity';

const router = express.Router()

// create post
router.post("/create", (req, res) => {
    const { title
        , content
        , devNeeded
        , pmNeeded
        , designNeeded
        , wantedSkills
        , owner }: createPostRequest
        = req.body

    db.then(async connection => {
        const ownerFound = await User.findAndCount({ username: owner.toString() })
        if (ownerFound[1] > 1 || ownerFound[1] <= 0) {
            res.status(401).json({ message: "Username Error" }).end()
        }

        const newPost = await Post.create({ title, content, devNeeded, pmNeeded, designNeeded, wantedSkills, owner: ownerFound[0][0] }).save();
        res.status(200).json({ message: "Your Post has been created.", post: newPost })
    })
})
// update post

// delete post

// read all posts

// read post by title

// read post by skills

export default router;