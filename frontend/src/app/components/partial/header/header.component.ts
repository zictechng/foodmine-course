import { User } from './../../../shared/models/User';
import { UserService } from './../../../services/user.service';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartQuantity = 0;
  user!: User;


  constructor(cartService: CartService, private userService:UserService){
    cartService.getCartObservable().subscribe((newCart) =>{
      this.cartQuantity = newCart.totalCount;
    })

    // this will make user details available in the header to be able to display user details
    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
  }

  ngOnInit(): void {

  }

  // logout user function here...
  logout(){
    this.userService.logout();
  }

  // this is to check if user is login
  get isAuth(){
    return this.user.token;
  }
}
