import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CustomerSignUpComponent } from './components/customer/customer-sign-up/customer-sign-up.component';
import { CustomerLoginPageComponent } from './components/customer/customer-login-page/customer-login-page.component';
import { AdminLoginPageComponent } from './components/admin/admin-login-page/admin-login-page.component';
import { CustomerCartComponent } from './components/customer/customer-cart/customer-cart.component';

import { CustomerOrderComponent } from './components/customer/customer-order/customer-order.component';
import { CustomerPaymentComponent } from './components/customer/customer-payment/customer-payment.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminAddfoodComponent } from './components/admin/admin-addfood/admin-addfood.component';
import { FoodListComponent } from './components/admin/food-list/food-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CustomerHomeComponent } from './components/customer/customer-home/customer-home.component';
import { AdminOrderListComponent } from './components/admin/admin-order-list/admin-order-list.component';


const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'change-password',component:ChangePasswordComponent},
  {path:'customer-register',component:CustomerSignUpComponent},
  {path:'customer-login',component:CustomerLoginPageComponent },
  {path:'admin-login',component:AdminLoginPageComponent},
  {path:'contact-us',component:ContactUsComponent},
  
  {path:'customer',children:[
     {path:'home',component:CustomerHomeComponent},
    {path:'cart',component:CustomerCartComponent},
    {path:'order',component:CustomerOrderComponent},
    {path:'payment/:orderId/:totalPrice',component:CustomerPaymentComponent}
  ]}  ,
  {path:'admin',children:[
    {path:'home',component:AdminHomeComponent},
    {path:'addproduct',component:AdminAddfoodComponent},
    {path:'listproduct',component:FoodListComponent},
    {path:'order-list',component:AdminOrderListComponent},
  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
