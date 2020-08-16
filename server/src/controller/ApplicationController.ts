import { CustomError } from './../exception/customError';
import { Role } from './../types/role';
import * as express from "express"
import { User, Post, Application } from "./../entity"
import db from "../db";
const router = express.Router()

// add application to post
router.post("/apply", (req, res) => {
    const { postId, userId } = req.body;
    db.then(async connection => {
        try {
            const user = await User.findOne({ userId: parseInt(userId) })
            const post = await Post.findOne({ postId: parseInt(postId) })
            if (!user) throw new CustomError("Cannot find user")
            if (!post) throw new CustomError("Cannot find post")
            if (post.ownerId == userId) throw new CustomError("자신의 프로젝트에는 지원할 수 없습니다.")

            const applicationExisting = await Application.findOne({ where: { ownerId: userId, postId } })
            if (applicationExisting) throw new CustomError("이미 지원 완료된 프로젝트입니다.")
            const application = await Application.create({
                role: user.role
                , ownerId: userId
                , owner: user
                , postId: post.postId
                , post
            }).save()

            res.status(200).json({ message: "You have successfully applied for this project", application }).end()
        } catch (err) {
            if (err) res.status(404).json({ message: err.message })
        }
    })
})

// delete application to post
router.post("/delete", (req, res) => {
    const { applicationId } = req.body

    db.then(async connection => {
        await Application.delete({ applicationId })
        res.status(200).json({ message: "Application has successfully deleted" }).end()
    })
})

// accept application
router.post("/accept", (req, res) => {
    const { applicationId, postId, userId } = req.body
    db.then(async connection => {
        const user = await User.findOne({ userId: parseInt(userId) })
        const post = await Post.findOne({ postId: parseInt(postId) })
        const userRole = user.role
        switch (userRole) {
            case Role.DESIGNER:
                if (post.designRecruited >= post.designNeeded) {
                    res.status(406).json({ message: `There's already enough ${Role.DESIGNER}` }).end()
                    return;
                } else {
                    await Post.update({ postId }, { designRecruited: post.designRecruited + 1 })
                    res.status(200).json({ message: `You have accepted a ${userRole}` })
                    await Application.update({ applicationId }, { isAccepted: true })
                    return;
                }
            case Role.DEVELOPER:
                if (post.devRecruited >= post.devNeeded) {
                    res.status(406).json({ message: `There's already enough ${Role.DEVELOPER}` }).end()
                    return;
                } else {
                    await Post.update({ postId }, { devRecruited: post.devRecruited + 1 })
                    await Application.update({ applicationId }, { isAccepted: true })
                    res.status(200).json({ message: `You have accepted a ${userRole}` })
                    return;
                }
            case Role.PROJECTMANAGER:
                if (post.pmRecruited >= post.pmNeeded) {
                    res.status(406).json({ message: `There's already enough ${Role.PROJECTMANAGER}` }).end()
                    return;
                } else {
                    await Post.update({ postId }, { pmRecruited: post.pmRecruited + 1 })
                    await Application.update({ applicationId }, { isAccepted: true })
                    res.status(200).json({ message: `You have accepted a ${userRole}` })
                    return;
                }
            default:
                res.status(406).json({ message: "You have failed to apply" }).end()
                return;
        }
    })
})


// get applications by post
router.post("/getappsbypost", (req, res) => {
    const { postId } = req.body
    db.then(async connection => {
        const applications = await Post.find({
            where: {
                postId
            }, relations: ["applications"]
        })

        res.status(200).json({ applications: applications[0].applications }).end()
    })
})

router.post("/getappsbyuser", (req, res) => {
    const { userId } = req.body
    db.then(async connection => {
        // const posts = await Post.find({
        //     where: {
        //         ownerId: userId
        //     }, relations: ["applications"]
        // })

        const applications = await Application.find({
            where: {
                ownerId: parseInt(userId)
            },
            relations: ["post"]
        })

        res.status(200).json({ applications }).end()
    })
})




export default router;