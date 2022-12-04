import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './component/pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'search/:searchTerm', component: HomeComponent},
  {path: 'tag/:tag', component:HomeComponent},
  {path: 'food/:id', component:FoodPageComponent},
  {path: 'cart-page', component: CartPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'checkout', component: CheckoutPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
