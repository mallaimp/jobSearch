import express, {Request, response, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import User from "../../Database/Schemas/userSchema";
import bcrypt from "bcryptjs";
import avatar from "gravatar";
import jwt from "jsonwebtoken";
import tokenVerifier from "../../middlewares/tokenVerifier";
import { IEducation, IExperience, IProfile } from "../../Models/IProfile";
import ProfileTable from "../../Database/Schemas/userProfileSchema";
import mongoose from "mongoose";
import { IUser } from "../../Models/IUser";

const userRouter:Router = express.Router(); 

/*
    @usage : Get a User Details
    @path : http://127.0.0.1:9191/api/users
    @method : GET
    @access : PUBLIC
    @fields : email, password
 */
userRouter.get("/", async (request:Request, response:Response)=>{
    // try{
        let user = await User.find({isAdmin:false});
        if(user){
            let completeData =[]
            for (let i=0; i < user.length;i++){
                const mongoJObId = new mongoose.Types.ObjectId(user[i]._id);
                let profileDetails = await ProfileTable.find({user:mongoJObId});
                if(profileDetails.length > 0){
                    let data ={
                        "id":user[i]._id,
                        "name":user[i].name,
                        "email":user[i].email,
                        "location":profileDetails[0].location,
                        "designation":profileDetails[0].designation,
                        "skills":profileDetails[0].skills,
                        "experience":profileDetails[0].experience,
                        "education":profileDetails[0].education,
                    }
                    completeData.push(data);
                }
            }
            
            return response.status(200).json({
                user:completeData
            })
        }
        response.status(200);
        response.json({
            user:user
        })
    // }
    // catch(error){
    //     response.status(500);
    //     response.json({
    //         error:error
    //     })
    // }
    
})

/*
    @usage : Post a User Details
    @path : http://127.0.0.1:9393/api/users/register
    @method : POST
    @access : PUBLIC
    @fields : name ,email, password 
 */

    userRouter.post('/register', [
        body('name').not().isEmpty().withMessage("Name is Required"),
        body('email').isEmail().withMessage("Proper Email is Required"),
        body('password').isStrongPassword({
            minSymbols: 1,
            minNumbers: 1,
            minUppercase: 1,
            minLowercase: 1,
            minLength: 5
        }).withMessage("Strong Password is Required"),
        
        ], async (request: Request, response: Response) => {
    

        let errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors
            })
        }

        try{
            let {name ,email, password, isAdmin } = request.body;

            let userExist = await User.findOne({email:`${email}`});
            if(userExist){
                return response.status(400).json({
                    message:"This email already exist"
                })
            }

            //encrypt Password
            let salt = await bcrypt.genSalt(10);
            let encryptPassword = await bcrypt.hash(password,salt);

            //avatar
            let avatarImg = avatar.url(email,{
                s:'200',
                r:'pg',
                d:'mm'
            });

            // save in DB
            let newUser:any = {
                name:name,
                email:email,
                password:encryptPassword,
                isAdmin:isAdmin,
                avatarImg:avatarImg
            }

            let user = new User(newUser);
            user = await user.save();

            return response.status(200).json({
                message:"User Registration Successfull",
                user:user
            })
        }
        catch(error){
            return response.status(500).json({
                message:"Unable to Register User",
                error:error
            })
        }
})

/*
    @usage : Login
    @path : http://127.0.0.1:9191/api/users/login
    @method : GET
    @access : PUBLIC
    @fields : email, password 
*/

userRouter.post("/login",[

    body('email').isEmail().withMessage("Email is Required"),
    body('password').isStrongPassword({
        minLength:5,
        minLowercase:1,
        minNumbers:1,
        minSymbols:1,
        minUppercase:1
    }).withMessage("Password is not Strong"),
    body('isAdmin').not().isEmpty().withMessage("Admin Condition Required")
    ],async (request:Request, response:Response)=>{

        let error = validationResult(request);
        if(!error.isEmpty()){
            return response.status(404).json({
                error:error
            })
        }

        try{

            let {email, password, isAdmin} = request.body;

            //email validation
            let user:IUser | null = await User.findOne({email:email,isAdmin:isAdmin});
            if(!user){
                let message ="";
                if(isAdmin){
                    message ="Admin Email not Exist"
                }else{
                    message ="User Email not Exist"
                }
                return response.status(401).json({
                    message:message
                })
            }

            //password Validation
            let ismatch = await bcrypt.compare(password,user.password);
            if(!ismatch){
                return response.status(401).json({
                    message:"Password is wrong"
                })
            }

            //token
            let payload={
                user:{
                    id:user._id,
                    email:user.email
                }
            }

            const secreatKey :string | undefined = process.env.JWT_SECRET_KEY;
            if(secreatKey){
                let token:string | undefined = jwt.sign(payload,secreatKey, {expiresIn:10000000});
                return response.status(200).json({
                    message:"Login Successfully",
                    token:token,
                    user:user
                })
            }

        }
        catch(error){
            return response.status(500).json({
                message:"Unable to Login",
                error:error
            })
        }
})

/*
    @usage : Get userInfo
    @path : http://127.0.0.1:9191/api/users/me
    @method : GET
    @access : PRIVATE
    @fields : no-fields
 */
    userRouter.get('/me', tokenVerifier, async (request: Request, response: Response) => {

    // read the user info from the request (based on the configuration of tokenVerifier)
    let requestedUser: any = request.headers['user'];

    // read the user info using the requestedUser
    let user = await User.findById(requestedUser?.id).select('-password');

    response.status(200).json({
        msg: 'Token verification is success!',
        user: user
    });
});

export default userRouter;