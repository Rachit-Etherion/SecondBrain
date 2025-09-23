import express from "express";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import  jwt from "jsonwebtoken"; 
import { USER_JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { randomBytes } from "crypto";

const app = express();
app.use(express.json());

app.post("/api/v1/signup",async (req, res) => {
    // TODO: Zod
    const username = req.body.username;
    const password = req.body.password;

    // TODO: hash the password
    try {
        await UserModel.create({
            username: username,
            password: password
        });

        res.json({
            message: "User signed Up"
        });
    } catch(e) {
        res.status(411).json({
            message: "User already exist"
        });
    }
});

app.post("/api/v1/signin",async (req, res) => {
    // TODO: Zod
    const username = req.body.username;
    const password = req.body.password;
    const existuser = await UserModel.findOne({
        username: username,
        password: password
    })

    if(existuser) {
        const token = jwt.sign({
            id: existuser._id
        }, USER_JWT_SECRET);

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }

});

app.post("/api/v1/content", userMiddleware ,async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    //@ts-ignore
    const userId = req.userId;

    try{
        await ContentModel.create({
            link,
            type,
            title,
            userId,
            tags: []
        });

        res.json({message: "Content added"});
    } catch(err) {
        res.status(500).json({
            error: "error while writing content"
        });
    }


});

app.get("/api/v1/content", userMiddleware ,async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId:userId
    }).populate("userId","username");
    res.json({content});
    
});

app.delete("/api/v1/content", userMiddleware ,async (req, res) => {
    const contentId = req.body.contentId;

    try {
        await ContentModel.deleteOne({
            _id: contentId,
            // @ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Content deleted"
        });
    } catch(err) {
        res.status(500).json({
            error: "error while deleting content"
        });
    }
});

app.post("/api/v1/brain/share", userMiddleware , async (req, res) => {
    try {
        const hash = randomBytes(6).toString("hex");

        // @ts-ignore
        const userId = req.userId;

        await LinkModel.create({
            hash,
            userId
        });

        res.json({
            message: "Sared Linke created",
            saredurl: `${req.protocol}://${req.get("host")}/api/v1/${hash}`
        });
    } catch(err) {
        res.status(500).json({
        error: "Error while creating share link"
        });
    }
});

app.get("/api/v1/:shareLink", async (req, res) => {
    try {
        const { shareLink } = req.params;

        const linkdoc = await LinkModel.findOne({
            hash: shareLink
        });

        if(!linkdoc) {
            return res.status(404).json({ error: "Invalid share link" });
        }

        const content = await ContentModel.find({
            userId: linkdoc.userId
        }).populate("tags", "title");

        res.json({
            username: (await UserModel.findById(linkdoc.userId))?.username,
            content
        });
    } catch (err) {
        res.status(500).json({
            error: "Error while fetching shared content"
        });
    }
});

app.listen(process.env.PORT || 3000)




