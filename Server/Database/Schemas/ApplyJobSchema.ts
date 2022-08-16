import { Model, model, Schema } from "mongoose";

const jobApply:Schema= new Schema<any>({
    applyjob: {type: Schema.Types.ObjectId, ref: 'job', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'users', required: true},

},{timestamps:true});

const JobApplyTable:Model<any>= model<any>('apply-job',jobApply);
export default JobApplyTable;