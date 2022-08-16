import express,{ Router,Request, Response } from "express";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import ProfileTable from "../../Database/Schemas/userProfileSchema";
import tokenVerifier from "../../middlewares/tokenVerifier";
import { IEducation, IExperience, IProfile } from "../../Models/IProfile";

const userProfileRouter:Router = express.Router();

/*
    @sno : 1
    @usage : Get User Profiles
    @path : http://127.0.0.1:9191/api/profile
    @method : Get
    @access : PUBLIC
    @fields :  
 */
userProfileRouter.get("/", tokenVerifier, async (request:Request, response:Response)=>{
   
    try{

        let requestedUser: any = request.headers['user'];
    
        const mongoUserId = new mongoose.Types.ObjectId(requestedUser.id);
        let profile = await ProfileTable.findOne({user:mongoUserId});

        
        return response.status(200).json({
            profile:profile,
            message:"All Profile Data"
        })
    }
    catch(errors){
        return response.status(500).json({
            message:"Unable to Get Profile",
            errors:errors
        })
    }
})

/*
    @sno : 2
    @usage : Creat User Profile
    @path : http://127.0.0.1:9191/api/profile/create
    @method : PUT
    @access : PRIVATE
    @fields :  location, designation, skills, experience, education
 */
userProfileRouter.post("/create", [
    body('location').not().isEmpty().withMessage("Location Is Required"),
    body('designation').not().isEmpty().withMessage("Designation Is Required"),
    body('location').not().isEmpty().withMessage("Skills Is Required"),


],tokenVerifier,async (request:Request, response:Response)=>{
        let error = validationResult(request);
        if(!error.isEmpty()){
            return response.status(401).json({
                error:error
            })
        }

    try{
        let requestedUser: any = request.headers['user'];
        let {
            location, designation, skills
        } = request.body;

        let profileObj: any = {
            user: requestedUser.id,
            location: location,
            designation: designation,
            skills: skills,
            experience: [] as IExperience[],
            education: [] as IEducation[]
        };

        let profileExist = await ProfileTable<IProfile>.findOne({user:requestedUser.id});
        let profile=""
        if(profileExist){
            let id = profileExist._id
            profileObj.experience=profileExist.experience;
            profileObj.education=profileExist.education;
            let profile = await ProfileTable.findByIdAndUpdate(id, {
                $set: profileObj
            }, {new: true});
        } else{
           let profile = new ProfileTable<IProfile>(profileObj);
            profile = await profile.save();
        }
        return response.status(200).json({
            message:"Profile Saved Successfully",
            profile:profile
        })
    }
    catch(errors){
        return response.status(500).json({
            message:"Unable to Update Profile",
            errors:errors
        })
    }
})

/*
    @sno : 3
    @usage : Add an experience in Profile
    @url : http://127.0.0.1:9191/api/profile/experience
    @fields : title, company, location, from, to, current, description
    @method : POST
    @access : PRIVATE
 */
    userProfileRouter.post('/experience', [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('company').not().isEmpty().withMessage('company is required'),
        body('location').not().isEmpty().withMessage('location is required'),
        body('from').not().isEmpty().withMessage('from is required'),
    ], tokenVerifier,async (request: Request, response: Response) => {
        
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({errors: errors.array()});
        }
    
        try {
            let requestedUser: any = request.headers['user'];
            let {title, company, location, from, to, current, description} = request.body;
    
            let mongoUserId = new mongoose.Types.ObjectId(requestedUser.id);
            
            let profile = await ProfileTable.findOne({user: mongoUserId}).populate('user', ['name', 'avatar']);
            if (!profile) {
                return response.status(200).json({
                    errors: [
                        {
                            message: 'No Profile Found!'
                        }
                    ]
                });
            }
            let experienceObj: IExperience = {
                title: title,
                company: company,
                location: location,
                from: from,
                to: to ? to : '',
                current: current ? current : false,
                description: description
            }
            // update experience to profile
            profile.experience.unshift(experienceObj);
            await profile.save();
            return response.status(200).json({
                message: 'Experience is Added Successfully!'
            });
        } catch (error) {
            return response.status(500).json({
                errors: [
                    {
                        message: 'Server Error'
                    }
                ]
            });
        }
    });

/*
    @sno : 4
    @usage : Delete an experience of a Profile
    @url : http://127.0.0.1:9999/api/profiles/experience/:userId/:experienceId
    @fields : no-fields
    @method : DELETE
    @access : PRIVATE
*/
userProfileRouter.delete('/experience/:experienceId',tokenVerifier, async (request: Request, response: Response) => {
    try {
        
        let requestedUser: any = request.headers['user'];
        let {experienceId} = request.params;
        let mongoUserId = new mongoose.Types.ObjectId(requestedUser.id);
        let profile = await ProfileTable.findOne({user: mongoUserId}).populate('user', ['name', 'avatar']);
        if (!profile) {
            return response.status(200).json({
                errors: [
                    {
                        message: 'No Profile Found!'
                    }
                ]
            });
        }
        let index = profile.experience.map(exp => exp._id?.toString()).indexOf(experienceId.toString());
        if (index !== -1) {
            profile.experience.splice(index, 1);
            await profile.save();
            return response.status(200).json({
                message: 'Experience is Removed!'
            });
        }
    } catch (error) {
        return response.status(500).json({
            errors: [
                {
                    message: 'Server Error'
                }
            ]
        });
    }
});


/*
    @sno : 5
    @usage : Add an education of a Profile
    @url : http://127.0.0.1:9191/api/profile/education
    @fields : user, school, degree, fieldOfStudy , passout , description
    @method : POST
    @access : PRIVATE
 */
userProfileRouter.post('/education', [
    body('school').not().isEmpty().withMessage('School is required'),
    body('degree').not().isEmpty().withMessage('Degree is required'),
    body('fieldOfStudy').not().isEmpty().withMessage('FieldOfStudy is required'),
    body('passout').not().isEmpty().withMessage('Passout is required'),
], tokenVerifier, async (request: Request, response: Response) => {
    
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }

    try {
        let requestedUser: any = request.headers['user'];
        let {school, degree, fieldOfStudy, passout, description} = request.body;

        let mongoUserId = new mongoose.Types.ObjectId(requestedUser.id);
        
        let profile = await ProfileTable.findOne({user: mongoUserId}).populate('user', ['name', 'avatar']);
        if (!profile) {
            return response.status(200).json({
                errors: [
                    {
                        message: 'No Profile Found!'
                    }
                ]
            });
        }
        let educationObj: IEducation = {
            school: school,
            degree: degree,
            fieldOfStudy: fieldOfStudy,
            passout:passout,
            description: description
        }
        // update education to profile
        profile.education.unshift(educationObj);
        await profile.save();
        return response.status(200).json({
            message: 'Education is Added Successfuly'
        });
    } catch (error) {
        return response.status(500).json({
            errors: [
                {
                    message: 'Server Error'
                }
            ]
        });
    }
});
    
/*
    @sno : 6
    @usage : Delete an education of a Profile
    @url : http://127.0.0.1:9999/api/profiles/education/:userId/:educationId
    @fields : no-fields
    @method : DELETE
    @access : PRIVATE
    */
userProfileRouter.delete('/education/:educationId', tokenVerifier, async (request: Request, response: Response) => {
    try {
        let requestedUser: any = request.headers['user'];
        let {educationId} = request.params;
        let mongoUserId = new mongoose.Types.ObjectId(requestedUser.id);
        let profile = await ProfileTable.findOne({user: mongoUserId}).populate('user', ['name', 'avatar']);
        if (!profile) {
            return response.status(200).json({
                errors: [
                    {
                        message: 'No Profile Found!'
                    }
                ]
            });
        }
        let index = profile.education.map(edu => edu._id?.toString()).indexOf(educationId.toString());
        if (index !== -1) {
            profile.education.splice(index, 1);
            await profile.save();
            return response.status(200).json({
                message: 'Education is Removed!'
            });
        }
    } catch (error) {
        return response.status(500).json({
            errors: [
                {
                    message: 'Server Error'
                }
            ]
        });
    }
});
    
    
export default userProfileRouter;