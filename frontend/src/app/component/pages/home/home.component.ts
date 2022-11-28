import { FoodService } from './../../../services/food.service';
import { Food } from './../../../shared/models/Food';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  foods:Food[] = [];
  // activatedRoute is for the search result to show in the home page
  constructor(private foodService:FoodService, activatedRoute:ActivatedRoute) {
    // this is for the search
    activatedRoute.params.subscribe((params) =>{
      if(params.searchTerm)
      this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      // this is for showing result by tag
      else if(params.tag)
      this.foods = this.foodService.getAllFoodsByTag(params.tag);
      // if there is no search term then show the normal page result
      else
       // this is for normal page getting all data
      this.foods = foodService.getAll();
    })
  }

  ngOnInit(): void {

  }
}
