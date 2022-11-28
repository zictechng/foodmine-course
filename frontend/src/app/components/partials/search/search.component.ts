import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchTerm = '';

  constructor(ActivatedRoute:ActivatedRoute, private router:Router){
    ActivatedRoute.params.subscribe((params) =>{
      if(params.searchTerm) this.searchTerm = params.searchTerm;
    })
  }


  ngOnInit(): void {

  }

  // this will send the details user entered in the search input and send it to the url for searching...
  search(term:string):void{
    this.router.navigateByUrl('/search/'+ term);
  }
}
