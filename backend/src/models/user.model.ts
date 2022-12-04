import { Schema , model} from "mongoose";

// this is the typescript interface
export interface User{
    id:string;
    email: string;
    password: string;
    name: string;
    address: string;
    isAdmin: boolean;
}
// user schema here...
export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
}, {
    timestamps: true,
    //here the convertion of _id to id using virtual 
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

// here is the model function

export const UserModel = model<User>('user', UserSchema);