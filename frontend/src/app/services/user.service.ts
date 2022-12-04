import { IUserRegister } from './../shared/interfaces/IUserRegister';
import { USER_LOGIN_URL, USER_REGISTER_URL } from './../shared/contants/urls';
import { HttpClient } from '@angular/common/http';
import { User } from './../shared/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { ToastrService } from 'ngx-toastr';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;

  //private userSubject = new BehaviorSubject<User>(new User());
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable :Observable<User>;

  constructor(private http:HttpClient,
    private toastrService: ToastrService ) {
    this.userObservable = this.userSubject.asObservable(); // this is the read only version of the subject

  }

  // get current user login details
  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          // show toat message for success
           this.userSubject.next(user);
           this.toastrService.success('You have logged in successful!', 'Authenticated!');
          //  this.toastrService.success(
          //   `Welcome to Foodmine! ${user}`,
          //   'Login Successful'
          // );
          //console.log(`login successful`, this.userSubject);
        },
        error: (errorResponse) =>{
          // show toat message for error'
          //this.toastrService.error(errorResponse.error, 'Login Failed')
          console.log('Login failed');
        }
      })
    );
  }


  // register user details goes here...
  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the Foodmine ${user.name}`,
            'Register successful'
          )
        },
        error: (errorResponse) =>{
          this.toastrService.error(errorResponse.error, 'Registration failed.')
        }
      })
    )
  }

  // this is for logout
  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  // saving user details to local storage
  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // get user from localstorage here...
  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;

    return new User();
  }
}
