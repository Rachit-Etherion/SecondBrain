import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { USER_JWT_SECRET } from "./config.js";
import mongoose, { Types } from "mongoose";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const header = req.headers["authorization"]
    if(!header) {
        return res.status(401).json({error: "Authorization header missing"});
    }
    try {
        // TODO: User Bearer in future and split it here
        const decode = jwt.verify(header as string,USER_JWT_SECRET);
        
        if(typeof decode === "string") {
            return res.status(401).json({error: "Invalid token format"});
        }

        (req as Request & { userId?: string }).userId = decode.id;
        next();
    } catch(err) {
        return res.status(401).json({error: "Invalid or expired token"});
    }
};