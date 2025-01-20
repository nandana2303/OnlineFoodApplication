import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatSliderModule} from '@angular/material/slider';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AdminAddfoodComponent } from './components/admin/admin-addfood/admin-addfood.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminLoginPageComponent } from './components/admin/admin-login-page/admin-login-page.component';
import { FoodListComponent } from './components/admin/food-list/food-list.component';
import { CustomerCartComponent } from './components/customer/customer-cart/customer-cart.component';
import { CustomerHeaderComponent } from './components/customer/customer-header/customer-header.component';

import { CustomerLoginPageComponent } from './components/customer/customer-login-page/customer-login-page.component';
import { CustomerOrderComponent } from './components/customer/customer-order/customer-order.component';
import { CustomerPaymentComponent } from './components/customer/customer-payment/customer-payment.component';
import { CustomerSignUpComponent } from './components/customer/customer-sign-up/customer-sign-up.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import {  NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {MatMenuModule} from '@angular/material/menu';
import { PagingComponent } from './components/paging/paging.component';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CustomerHomeComponent } from './components/customer/customer-home/customer-home.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AdminOrderListComponent } from './components/admin/admin-order-list/admin-order-list.component';
import { OrderHistoryDialogComponent } from './components/customer/order-history-dialog/order-history-dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
   
    AppComponent,
  AboutUsComponent,
    ContactUsComponent,
    HomePageComponent,
    AppHeaderComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    AdminAddfoodComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    AdminLoginPageComponent,
    FoodListComponent,
    CustomerCartComponent,
    CustomerHeaderComponent,
    CustomerLoginPageComponent,
    CustomerOrderComponent,
    CustomerPaymentComponent,
    CustomerSignUpComponent,
    PagingComponent,
    CustomerHomeComponent,
    AdminOrderListComponent,
    OrderHistoryDialogComponent,
    
    
     
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSliderModule,
    HttpClientJsonpModule,
    MatMenuModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    ],
  providers: [DatePipe, provideAnimationsAsync()],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
