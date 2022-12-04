import { HTTP_BAD_REQUEST } from './../constants/http_status';
import { User, UserModel } from '../models/user.model';
import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';


const router = Router();

// this will get data from data.ts file and seed it into the database here...
router.get("/seed", asyncHandler(
    async (req, res) =>{
        // this will check if the food details alread added to the database
        const usersCount = await UserModel.countDocuments();
        if(usersCount> 0){
            res.send("Seed is already done!");
            return;
        }
        // else if no such record, create it/seed it to db
        await UserModel.create(sample_users);
        res.send("Seed Is Done!, All Users Added. Thank You");
        }
) )

// Login with mongoDB via the api here...
router.post("/login", asyncHandler(
    async (req, res) =>{
        const {email, password} = req.body; // this is call desctructuring assignment
        const user = await UserModel.findOne({email});
            if(user && (await bcrypt.compare(password,user.password))){
                res.send(generateTokenResponse(user));
            }else{
               // const BAD_REQUEST = 400;
                res.status(HTTP_BAD_REQUEST).send("User name or password is invalid");
            }
    }
))


// register api with mongoDB here
router.post('/register', asyncHandler(
    async(req, res) =>{
        const {name, email, password, address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST)
            .send('User with the email ID already exist');
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser:User ={
            id: '',
            name, // this name does not need to have assigned value becaues our input field will have same name else you will need to specify it 
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false,
        }
        // save the details to db
        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser)) // this generate token and allowed user to login after registration
        
    }
))
// function/method for generating webtoken for user authentication
const generateTokenResponse = (user:any) =>{
const token = jwt.sign({
    email:user.email, isAdmin:user.isAdmin
}, "SomeRandomText", {
    expiresIn: "30d"
});
user.token = token
return user;
}


// // other way of doing same logic as the above. This is the login function with local data.ts via api 
// router.post("/login", (req, res) =>{
//     const {email, password} = req.body; // this is call desctructuring assignment
//     const user = sample_users.find(user => user.email === email &&
//         user.password === password);
//         if(user){
//             res.send(generateTokenResponse(user));
//         }else{
//             res.status(400).send("User name or password is invalid");
//         }
// })

// // function/method for generating webtoken for user authentication
// const generateTokenResponse = (user:any) =>{
// const token = jwt.sign({
//     email:user.email, isAdmin:user.isAdmin
// }, "SomeRandomText", {
//     expiresIn: "30d"
// });
// user.token = token
// return user;
// }

export default router