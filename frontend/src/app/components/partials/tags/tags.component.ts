import { FoodService } from './../../../services/food.service';
import { Tag } from './../../../shared/models/Tag';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit{

  tags?:Tag[];

  constructor(foodService:FoodService){

  foodService.getAllTags().subscribe(serverTags =>{
    this.tags = serverTags;
  });


    // the below is for static data fetching
    //this.tags = foodService.getAllTags();
  }

  ngOnInit(): void {

  }
}
