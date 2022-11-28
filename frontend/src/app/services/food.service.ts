import { Tag } from './../shared/models/Tag';
import { sample_foods, sample_tags } from './../../data';
import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  // this will get all the static food data
  getAll():Food[]{
    return sample_foods
  }

  // this for the search methos...
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  // tags method/function goes here
  getAllTags():Tag[]{
    return sample_tags;
  }

  getAllFoodsByTag(tag:string):Food[]{

    return tag === "All"?
    this.getAll():
    this.getAll().filter(food => food.tags?.includes(tag));
  }

  // this for the food details page method here
  getFoodById(foodId:string):Food{
    return this.getAll().find(food => food.id == foodId)?? new Food();
  }
}
