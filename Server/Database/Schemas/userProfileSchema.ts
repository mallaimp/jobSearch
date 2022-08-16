import mongoose, {Schema, Model} from 'mongoose';
import { IProfile } from '../../Models/IProfile';

const userProfileSchema: Schema = new Schema<IProfile>({
    user: {type: Schema.Types.ObjectId, ref: 'users', required: true},
    location: {type: String},
    designation: {type: String},
    skills: {type: [String]},
    experience: [
        {
            title: {type: String},
            company: {type: String},
            location: {type: String},
            from: {type: String},
            to: {type: String},
            current: {type: Boolean},
            description: {type: String},
        }
    ],
    education: [
        {
            school: {type: String},
            degree: {type: String},
            fieldOfStudy: {type: String},
            passout: {type: String},
            description: {type: String},
        }
    ]
}, {timestamps: true});

const ProfileTable: Model<IProfile> = mongoose.model<IProfile>('user-profiles', userProfileSchema);
export default ProfileTable;