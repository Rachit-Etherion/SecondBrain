import mongoose, { Types } from "mongoose"
import { DB_URL } from "./config.js";

async function connectDB() {
    try {
        await mongoose.connect(DB_URL);
        console.log("Database connected")
    } catch(err) {
        console.log("DB connection error : ", err);
        process.exit(1) // exit app if db fails to connect
    }
}

connectDB();

const UserScema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const TagSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true}
});

const contentTypes = ["Youtube","Twitter"];

const ContentSchema = new mongoose.Schema({
    link: {type: String, required: true},
    type: {type: String , enum: contentTypes, required: true},
    title: {type: String, required: true},
    tags: [{type: Types.ObjectId, ref: 'Tag'}],
    userId: {type: Types.ObjectId, ref: 'User', required: true}
});

const LinkSchema = new mongoose.Schema({
    hash: {type: String, required: true},
    userId: {type: Types.ObjectId, ref: 'User', required: true}
});

export const UserModel = mongoose.model("User", UserScema);
export const TagModel = mongoose.model("Tag", TagSchema);
export const ContentModel = mongoose.model("Content", ContentSchema);
export const LinkModel = mongoose.model("Link", LinkSchema);