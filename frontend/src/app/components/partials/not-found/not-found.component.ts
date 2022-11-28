import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit{


  @Input()
  visible = false; // this will make it hidden at page load

  @Input()
  notFoundMessage = "Nothing found";

  @Input()
  resetLinkText = "Reset";

  @Input()
  resetLinkRoute = "/";


  constructor(){}


  ngOnInit(): void {

  }

}
