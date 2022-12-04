// import { sample_users } from './data';
// import { sample_foods, sample_tags } from './../../frontend/src/data';
//import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

import express from  "express";
import cors from "cors";

import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import { dbConnect } from './configs/database.config';

// call the db connect here
dbConnect();

const app = express();
app.use(express.json());

// this is to allowed the backend to have access to the frontend url
app.use(cors( {
    credentials:true,
    origin:["http://localhost:4200"]
}));

// call the food router route here...
app.use("/api/foods", foodRouter);

// call the user router route here...
app.use("/api/users", userRouter);

// now let start to create the apis call here
// the below api was use for static route, but now we have a separate route for all

// // this get all food details api here...
// app.get("/api/foods", (req, res) =>{
// res.send(sample_foods)
// })


// // search foods api call here...
// app.get("/api/foods/search/:searchTerm", (req, res) =>{
//     const searchTerm = req.params.searchTerm;
//     const foods = sample_foods.filter(food => food.name.toLowerCase()
//     .includes(searchTerm.toLowerCase()));
//     // here we send the respons/result to server/frontend
//     res.send(foods);
// })

// // getting all foods tags here api here...
// app.get("/api/foods/tags/", (req, res) =>{
//     res.send(sample_tags);
// })

// // getting foods by tags name api here... 
// app.get("/api/foods/tag/:tagName", (req, res) =>{
//     const tagName = req.params.tagName;
//     const foods = sample_foods.filter(food => food.tags?.includes(tagName));
//     res.send(foods);
// })

// // get food by ID api here..
// app.get("/api/foods/:foodId", (req, res) =>{
//     const foodId = req.params.foodId;
//     const food = sample_foods.find(food => food.id == foodId);
//     res.send(food);
// })

// login api route here...
// app.post("/api/users/login", (req, res) =>{
//     const body = req.body;
//     const user = sample_users.find(user => user.email === body.email &&
//         user.password === body.password);
// })
// // other way of doing same logic as the above
// app.post("/api/users/login", (req, res) =>{
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
// to listen to port
const port = 5000;
app.listen(port, () =>{
console.log("Website served on http://localhost:" + port);
})