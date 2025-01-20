import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnlinefoodService } from '../../service/onlinefood.service';
import { take } from 'rxjs';

@Component({standalone:false, 
  selector: 'app-customer-login-page',
  templateUrl: './customer-login-page.component.html',
  styleUrls: ['./customer-login-page.component.css']
})
export class CustomerLoginPageComponent  implements OnInit {

  email: string = "";
  password: string = "";
  ccustomerLoginForm = new FormGroup({});
  customerLoginForm: any;

  constructor(
    private router: Router,
    private oService:OnlinefoodService,
    private fb: FormBuilder

  ) {
    const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
    this.customerLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(pattern)]],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });

  }

  ngOnInit(): void {
  }

  
  signIn(): void {

    const body = {
      "emailID": this.customerLoginForm.controls['email'].value,
      "password": this.customerLoginForm.controls['password'].value
    }
    console.log("=======>",body);
    this.oService.customerSignIn(body).pipe(take(1)).subscribe((res :any) => {
      console.log("***",res);
      if(res && res?.customerId){
       // alert("Login sucessful");
        this.oService.storeCustomerAuthorization(res?.customerId);
        let userName = '';
        if (res?.firstName) {
          userName+=res?.firstName;
        }
        if (res?.lastName){
          userName+=' ' + res?.lastName;
        }
        this.oService.storeCustomerUserName(userName);
        this.router.navigate(['/customer/home']);
       
      }
    }, err => {
      console.log("Error ", err);
      console.log(">>> ", err);
      if(err?.error && err?.error.startsWith("Customer  not found with")      ){
        alert("Customer email/password invalid");
      }
      else{
        alert("Something going wrong in login! pl try again");
      }
    })
  

  }

  routeToNewUser(): void {
    this.router.navigate(["/customer-register"]);
  }

  routeToForgotPassword(): void {
    this.router.navigate(["/forgot-password"]);
  }
 }