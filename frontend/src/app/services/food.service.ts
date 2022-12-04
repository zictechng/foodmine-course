import { FOODS_URL, FOODS_BY_SEARCH_URL, FOODS_TAGS_URL, FOOD_BY_ID_URL,FOODS_BY_TAG_URL } from './../shared/contants/urls';
import { Observable } from 'rxjs';
import { Tag } from './../shared/models/Tag';
import { sample_foods, sample_tags } from './../../data';
import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  // this will get all the static food data
  // getAll():Food[]{
  //   return sample_foods
  // }

  // this work with api call from the backend
  getAll(): Observable <Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }

  // this for the search method...
  // getAllFoodsBySearchTerm(searchTerm:string){
  //   return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  // }

  // this is api search call from the backend
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  // tags method/function goes here
  // getAllTags():Tag[]{
  //   return sample_tags;
  // }

  getAllTags(): Observable <Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  // getAllFoodsByTag(tag:string):Food[]{

  //   return tag === "All"?
  //   this.getAll():
  //   this.getAll().filter(food => food.tags?.includes(tag));
  // }

  // get all food by tag name api call here ...
  getAllFoodsByTag(tag: string): Observable <Food[]>{
    return tag === "All"?
    this.getAll():
    this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  // this for the food details page method here
  // getFoodById(foodId:string): Food{
  //   return this.getAll().find(food => food.id == foodId)?? new Food();
  // }

  // this get single food by ID and show its detail in details page api call
  getFoodById(foodId:string): Observable <Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId);
  }
}
