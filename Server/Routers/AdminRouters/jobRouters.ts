import express,{ Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import JobApplyTable from "../../Database/Schemas/ApplyJobSchema";
import JobTable from "../../Database/Schemas/jobProfileschema";
import tokenVerifier from "../../middlewares/tokenVerifier";
// import constants from "../../"

const jobRouter:Router = express.Router();

/*
    @usage : Get All Jobs
    @path : http://127.0.0.1:9191/api/jobs
    @method : GET
    @access : Public
    @fields : no-fields
 */

jobRouter.get("/",async (request:Request, response:Response)=>{

    try{

        let jobs = await JobTable.find().sort({_id:-1});
        return response.status(200).json({
            jobs:jobs
        })
    }   
    catch(error){
        return response.status(500).json({
            message : "Unable to get details",
            error:error
        })
    } 
})

/*
    @usage : Get Admin All Jobs
    @path : http://127.0.0.1:9191/api/jobs/admin
    @method : GET
    @access : Public
    @fields : no-fields
 */

jobRouter.get("/admin/", tokenVerifier, async (request:Request, response:Response)=>{

    try{

        let requestedUser: any = request.headers['user'];
        let mongoUserId = new mongoose.Types.ObjectId(requestedUser.id);
        let jobs = await JobTable.find({user:mongoUserId}).sort({_id:-1});
        return response.status(200).json({
            jobs:jobs
        })
    }   
    catch(error){
        return response.status(500).json({
            message : "Unable to get details",
            error:error
        })
    } 
})

/*
    @usage : Get A Job
    @path : http://127.0.0.1:9191/api/jobs
    @method : GET
    @access : Public
    @fields : no-fields
 */

jobRouter.get("/:jobId", async (request:Request, response:Response)=>{

    try{

        let {jobId} = request.params;

        let jobs = await JobTable.findOne({_id:jobId})
        return response.status(200).json({
            job:jobs
        })
    }   
    catch(error){
        return response.status(500).json({
            message : "Unable to get details",
            error:error
        })
    } 
})

/*
    @usage : Add Job
    @path : http://127.0.0.1:9191/api/jobs/add
    @method : POST
    @access : Public
    @fields : title, company, description ,experiance, location ,skils
 */
jobRouter.post("/add",[

    body('title').not().isEmpty().withMessage("Job Title Required"),
    body('company').not().isEmpty().withMessage("Job Company Required"),
    body('description').not().isEmpty().withMessage("Job Description Required"),
    body('experiance').not().isEmpty().withMessage("Job Experiance Required"),
    body('location').not().isEmpty().withMessage("Job Location Required"),
    body('skills').not().isEmpty().withMessage("Job Skils Required")

],tokenVerifier,async (request:Request, response:Response)=>{

    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({
            errors:errors
        })
    }

    try{

        let requestedUser: any = request.headers['user'];
        let {title, company, description ,experiance, location ,skills} = request.body;

        let jobObj = {
            user:requestedUser.id,
            title:title,
            company:company,
            description:description,
            experiance:experiance,
            location:location,
            skills:skills
        }

        let job = new JobTable(jobObj)
        job = await job.save();
        return response.status(200).json({
            message: "Job Added Successfully",
            job:job
        })
    }   
    catch(error){
        return response.status(500).json({
            message : "Unable to save job details",
            error:error
        })
    } 
})

/*
    @usage : Update Job
    @path : http://127.0.0.1:9191/api/jobs/add
    @method : PUT
    @access : Public
    @fields : title, company, description ,experiance, location ,skils
 */
jobRouter.put("/update/:jobId",[

    body('title').not().isEmpty().withMessage("Job Title Required"),
    body('company').not().isEmpty().withMessage("Job Company Required"),
    body('description').not().isEmpty().withMessage("Job Description Required"),
    body('experiance').not().isEmpty().withMessage("Job Experiance Required"),
    body('location').not().isEmpty().withMessage("Job Location Required"),
    body('skills').not().isEmpty().withMessage("Job Skills Required")

], tokenVerifier,async (request:Request, response:Response)=>{

    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({
            errors:errors
        })
    }

    try{
        let requestedUser: any = request.headers['user'];
        let {jobId} = request.params;

        let {title, company, description ,experiance, location ,skills} = request.body;

        let jobObj = {
            user:requestedUser.id,
            title:title,
            company:company,
            description:description,
            experiance:experiance,
            location:location,
            skills:skills
        }

        let job = await JobTable.findByIdAndUpdate(jobId, {
            $set: jobObj
        }, {new: true});
        return response.status(200).json({
            message: "Job Updated Successfully",
            job:job
        })
    }   
    catch(error){
        return response.status(500).json({
            message : "Unable to Update details",
            error:error
        })
    } 
})

/*
    @usage : Delete Job
    @path : http://127.0.0.1:9191/api/jobs/delete
    @method : DELETE
    @access : Public
    @fields : no-fields
 */

jobRouter.delete("/delete/:jobId",async (request:Request, response:Response)=>{

    try{

        let {jobId} = request.params;

        let jobs = await JobTable.findByIdAndRemove(jobId);
        if(jobs == null){
            return response.status(401).json({
                message : "Provided Job ID not Found"
            })
        }else{ 
            return response.status(200).json({
                message : "Job Deleted Successfully",
                jobs:jobs
            })
        }
        
    }   
    catch(error){
        return response.status(500).json({
            message : "Unable to get details",
            error:error
        })
    } 
})

/*
    @usage : Apply Job
    @path : http://127.0.0.1:9191/api/jobs/apply
    @method : PUT
    @access : Private
    @fields : title, company, description ,experiance, location ,skils
 */
jobRouter.post("/apply",[

    body('jobId').not().isEmpty().withMessage("Job Id Required")

],tokenVerifier,async (request:Request, response:Response)=>{

    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({
            errors:errors
        })
    }

    try{

        let requestedUser: any = request.headers['user'];

        let {jobId, userId} = request.body;

        let jobObj = {
            applyjob:jobId,
            user:requestedUser.id
        }

        let existJOb = await JobApplyTable.findOne({applyjob:jobId});
        if(!existJOb){
            let job = new JobApplyTable(jobObj);
            job = await job.save();
            return response.status(200).json({
                message: "Job Applied Successfully",
                job:job
            })
        }else{
            return response.status(200).json({
                message: "You already Applied this Job"
            })
        }
        
    }   
    catch(error){
        return response.status(500).json({
            message : "Unable to Update details",
            error:error
        })
    } 
})

/*
    @usage : Get Applied Job
    @path : http://127.0.0.1:9191/api/jobs/apply/:userId
    @method : GET
    @access : Private
    @fields : title, company, description ,experiance, location ,skils
*/

jobRouter.get("/apply/:userId",tokenVerifier,async (request:Request, response:Response)=>{

    try{

        let requestedUser: any = request.headers['user'];

        let jobData:any = await JobApplyTable.find({user:requestedUser.id});

        if(jobData){
            let completeData =[]
            for (let i=0; i < jobData.length;i++){
                const mongoJObId = new mongoose.Types.ObjectId(jobData[i].applyjob);
                let jobDetails = await JobTable.findById(mongoJObId);
                completeData.push(jobDetails);
            }
            
            return response.status(200).json({
                jobs:completeData
            })
        }
    }   
    catch(error){
        return response.status(500).json({
            message : "Unable to Update details",
            error:error
        })
    } 
})

export default jobRouter;