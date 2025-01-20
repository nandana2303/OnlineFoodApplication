import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OnlinefoodService {
  url: string = 'http://localhost:8080';
  
  category: any = [{
    name: "SANDWICH" , value: 0,
  }, {
    name: "VEG", value: 1,
  }, {
    name: "NONVEG", value: 2
  }, {
    name: "DESSERTS", value:  3
  }, {
    name: "CHINESE", value:  4
  }, {
    name: "PIZZA", value:  5
  }, {
    name: "BURGER", value:  6
  },{
    name: "MOMOS", value:  7
  }
];
  
  constructor( 
    private http: HttpClient,
    private router: Router
    ) { }
   /* Customer Registeration */
  signUp(body: any): Observable<any> {
    return this.http.post(this.url + "/api/customers/register", body);
  }
  //Customer  login
  customerSignIn(body: any): Observable<any> {
    return this.http.post(this.url + "/api/customers/login", body);
  }
//once we logged in that time we are storing Customer  id into token 
storeCustomerAuthorization(token: string): void {
  localStorage.setItem("token", token);
}

getCustomerAuthorization(): any {
  const token = localStorage.getItem("token");
  return token; 
}

storeCustomerUserName(name: string): void {
  localStorage.setItem("userName", name);
}

getCustomerName(): any {
  const name = localStorage.getItem("userName");
  return name;
}

customerLogout(): void {
  localStorage.clear();
  this.router.navigate(['']);
}
//admin login
adminSignIn(body: any): Observable<any> {
  return this.http.post(this.url + "/api/admin/login", body);
}
storeAdminAuthorization(token: string): void {
  localStorage.setItem("admin", token);
}
getAdminAuthorization(): any {
  const token = localStorage.getItem("admin");
  return token; 
}

storeAdminUserName(name: string): void {
  localStorage.setItem("adminName", name);
}

getAdminName(): any {
  const name = localStorage.getItem("adminName");
  return name;
}

adminLogout(): void {
  localStorage.clear();
  this.router.navigate(['/home']);
}

isAdminLoginPresent(): void {
  if (this.getAdminAuthorization() === null) {
    this.router.navigate(['/admin-login']);
  }
}

addProduct(body: any): Observable<any> {
  return this.http.post(this.url + "/api/products/add products", body);
}

getProductlist():Observable<any> {
  return this.http.get(this.url + "/api/products");
}

deleteProduct(id :any):Observable<any> {
  //return this.http.delete(this.url + "/api/products/" +id);
  //secondway
  return this.http.delete(`${this.url}/api/products/${id}`);
}

getProductById(id:any):Observable<any> {
  return this.http.get(this.url + "/api/products/products/"+id);
}

editProduct(body: any,id:any): Observable<any> {
  return this.http.put(this.url + "/api/products/"+id, body);
}
getCategoryList(): any {
  return this.category;
}
getProductByCategory(cid: any, offset: any, limit: any):Observable<any>{
  return this.http.get(this.url+"/api/products/" + cid + "/"+ offset + "/" + limit);
}

getAllProducts(offset: any, limit: any):Observable<any>{
  return this.http.get(this.url+"/api/products/" + offset + "/" + limit);
}
addToCart(body: any,pid:any,cid:any):Observable<any>{
  return this.http.post(this.url+"/api/cart/"+cid+"/"+pid,body);
}

getCustomerById(id:any):Observable<any> {
  return this.http.get(this.url + "/api/customers/customer/"+id);
}

cartList():Observable<any>{
  return this.http.get(this.url+"/api/cart/list");
}
placeOrder(cid:any,cartid:any,body:any):Observable<any> {
  return this.http.post(this.url + "/api/orders/"+cid+"/"+cartid, body);
}
deleteCart(id :any):Observable<any> {
  
  return this.http.delete(`${this.url}/api/cart/${id}`);
}

orderList(id:any):Observable<any>{
  return this.http.get(this.url+"/api/orders/"+id);
}
addPayment(body:any,orderid:any,cid:any):Observable<any> {
  return this.http.post(this.url + "/api/payements/"+orderid+"/"+cid, body);
}
isCustomerLoginPresent(): void {
  if (this.getCustomerAuthorization() === null) {
    this.router.navigate(['/customer-login']);
  }
}
forgotPassword(body: any):Observable<any> {
  return this.http.post(this.url + "/api/customers/forgotpassword", body);
}

updateCustomerInformation(body: any):Observable<any> {
  return this.http.put(this.url + "/api/customers/customer/"+body?.customerId, body);
}

changePassword(cid: any,password:any):Observable<any> {
  return this.http.post(this.url + "/api/customers/"+cid+"/"+password,{});
}
getAllorderList():Observable<any>{
  return this.http.get(this.url+"/api/orders/")
}

placeOrderItem(cid:any, body:any):Observable<any>{
  return this.http.post(this.url + "/api/orders/addOrder/"+cid+"/", body);
}

}
