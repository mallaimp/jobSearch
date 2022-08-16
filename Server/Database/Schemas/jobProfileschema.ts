import { Model, model, Schema } from "mongoose";
import { IJObs } from "../../Models/IJobs";


const jobSchema:Schema= new Schema<IJObs>({
    user: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    title:{type:String, requird:true},
    company:{type:String, required:true},
    description:{type:String, required:true},
    experiance:{type:String, required:true},
    location:{type:String, required:true},
    skills:{type:[String], required:true},

},{timestamps:true});

const JobTable:Model<IJObs>= model<IJObs>('job',jobSchema);
export default JobTable;