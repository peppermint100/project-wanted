import { createPostRequest, updatePostRequest } from './../types/post';
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
        , owner
    }: createPostRequest
        = req.body

    db.then(async connection => {
        const ownerFound = await User.findAndCount({ username: owner.toString() })
        if (ownerFound[1] > 1 || ownerFound[1] <= 0) res.status(401).json({ message: "Username Error" }).end()

        const newPost = await Post.create({ title, content, devNeeded, pmNeeded, designNeeded, wantedSkills, owner: ownerFound[0][0] }).save();
        res.status(200).json({ message: "Your Post has been created.", post: newPost })
    })
})
// update post
router.post("/update", (req, res) => {
    const { postId
        , title
        , content
        , devNeeded
        , pmNeeded
        , designNeeded
        , wantedSkills }: updatePostRequest = req.body

    db.then(async connection => {
        // find selected post
        const postFound = await Post.findAndCount({ postId })
        if (postFound[1] <= 0 || postFound[1] !== 1) res.status(401).json({ message: "Cannot find Post" }).end()

        // check needed exceed current cruited
        const post = postFound[0][0]
        if (post.designRecruited > designNeeded
            || post.devRecruited > devNeeded
            || post.pmRecruited > pmNeeded) {
            res.status(401).json({ message: "Check Your Recruiutment Status" }).end()
        }


        // I didn't use active record so that we don't need to call post repository again
        post.title = title;
        post.content = content;
        post.devNeeded = devNeeded;
        post.designNeeded = designNeeded;
        post.pmNeeded = pmNeeded;
        post.wantedSkills = wantedSkills;

        const updatedPost = await connection.manager.save(post)
        res.status(200).json({ message: "Your Post has been updated", updatedPost }).end()
    })
})

// delete post
router.post("/delete", (req, res) => {
    const { postId } = req.body
    db.then(async connection => {
        const deletedPost = await Post.delete({ postId });
        console.log('delete result: ', deletedPost);

        res.status(200).json({ message: "Your Post has been deleted successfully" }).end()
    })
})

// read all posts
router.get("/allposts", (req, res) => {
    db.then(async connection => {
        const posts = await Post.find()
        res.status(200).json({ posts }).end()
    })
})

// read post by title

// read post by skills

export default router;