import express,{ Router,Request, Response } from "express";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import ProfileTable from "../../Database/Schemas/userProfileSchema";
import tokenVerifier from "../../middlewares/tokenVerifier";
import { IEducation, IExperience, IProfile } from "../../Models/IProfile";

const profileRouter:Router = express.Router();

profileRouter.get("/", tokenVerifier, async (request:Request, response:Response)=>{
   
    try{

        let requestedUser: any = request.headers['user'];
    
        const mongoUserId = new mongoose.Types.ObjectId(requestedUser.id);
        let profile = await ProfileTable.findOne({user:mongoUserId});

        
        return response.status(200).json({
            profile:requestedUser
        })
    }
    catch(errors){
        return response.status(500).json({
            message:"Unable to Get Profile",
            errors:errors
        })
    }
})

export default profileRouter;