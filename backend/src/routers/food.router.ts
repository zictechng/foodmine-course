import { FoodModel } from './../models/food.model';

// here we are not going to use app but we are going to use express router.
import {Router} from 'express';
import { sample_foods, sample_tags } from '../data';

import asyncHandler from 'express-async-handler';

const router = Router();

// this will get data from data.ts file and seed it into the database here...
router.get("/seed", asyncHandler(
    async (req, res) =>{
        // this will check if the food details alread added to the database
        const foodCount = await FoodModel.countDocuments();
        if(foodCount> 0){
            res.send("Seed is already done!");
            return;
        }
        // else if no such record, create it/seed it to db
        await FoodModel.create(sample_foods);
        res.send("Seed Is Done!, Thank You");
        }
) )

// async, .then is the same. but async is much prefer

//     // this get all food details api here...
// router.get("/", (req, res) =>{
//     res.send(sample_foods)
//     })

// this get all food details from mongoDB with the api call here...
router.get("/", asyncHandler(
    async (req, res) =>{
        const foods = await FoodModel.find(); // using find this get all the data from database.
        res.send(foods)
        }
))
    
    
    // search foods api from mongDB here...
    router.get("/search/:searchTerm", asyncHandler(
        async (req, res) =>{
            const searchRegex = new RegExp(req.params.searchTerm, 'i'); // this regExp is to enable case sensetive for both lower and upper case
            const foods = await FoodModel.find({name: {$regex:searchRegex}})
            res.send(foods);
        }
    ))

    // // search foods api from local data source call here...
    // router.get("/search/:searchTerm", (req, res) =>{
    //     const searchTerm = req.params.searchTerm;
    //     const foods = sample_foods.filter(food => food.name.toLowerCase()
    //     .includes(searchTerm.toLowerCase()));
    //     // here we send the respons/result to server/frontend
    //     res.send(foods);
    // })


    // getting all foods tags from mongoDB via api here...
    router.get("/tags/", asyncHandler(
        async(req, res) =>{
            const tags = await FoodModel.aggregate([
                {
                    $unwind: '$tags' // unwind help to find similar data and count them
                },
                {
                    $group:{
                        _id: '$tags',
                        count: {$sum: 1}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: '$_id',
                        count: '$count'
                    }
                }
            ]).sort({count: -1}); // -1 means descending 1 means ascending

            const all = {
                name: 'All',
                count: await FoodModel.countDocuments()
            }

            tags.unshift(all); // unshift is opposite of push, which push data into an array..., 
            // this will add this value to the beignning of result

            res.send(tags); // then send the result here to the client side here..
        }
    ))

    // // getting all foods tags from local data.ts via api here...
    // router.get("/tags/", (req, res) =>{
    //     res.send(sample_tags);
    // })

    
    
    // getting foods by tags name from mongoDB via api here... 
    router.get("/tag/:tagName", asyncHandler(
        async(req, res) =>{
            const foods = await FoodModel.find({tags: req.params.tagName})
             res.send(foods);
         }
    ))

    // // getting foods by tags name from the local data.ts via api here... 
    // router.get("/tag/:tagName", (req, res) =>{
    //     const tagName = req.params.tagName;
    //     const foods = sample_foods.filter(food => food.tags?.includes(tagName));
    //     res.send(foods);
    // })
    
    // get food by ID from the mongoDB via api here..
    router.get("/:foodId", asyncHandler(
        async(req, res) =>{
            const food = await FoodModel.findById(req.params.foodId);
             res.send(food);
         }
    ))

    // // get food by ID from the local data.ts file via api here..
    // router.get("/:foodId", (req, res) =>{
    //     const foodId = req.params.foodId;
    //     const food = sample_foods.find(food => food.id == foodId);
    //     res.send(food);
    // })

    export default router;