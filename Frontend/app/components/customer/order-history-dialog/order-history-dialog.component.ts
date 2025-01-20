import { Component, OnInit } from '@angular/core';
import { Cart } from '../../model/cart.model';
import { OnlinefoodService } from '../../service/onlinefood.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin, take } from 'rxjs';
import { Product } from '../../model/product.model';
import * as _ from 'lodash';

@Component({
  standalone:false,
  selector: 'app-order-history-dialog',
  templateUrl: './order-history-dialog.component.html',
  styleUrls: ['./order-history-dialog.component.css']
})
export class OrderHistoryDialogComponent implements OnInit{

  cartList: Cart[] = [];
  cartListBackup: Cart[] = [];
  grandTotal: number = 0;
  customer: any = {};
  


  constructor(
    private oService: OnlinefoodService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.oService.isCustomerLoginPresent();
    this.getCartList();
    this.getCustomerDetail();
  }

  ngOnInit(): void {
  }
  getCartList(): void {
    this.oService.cartList().pipe(take(1)).subscribe(
      (res: any) => {
        console.log("********", res);
        if (!!res && Array.isArray(res)) {
          const customerFilter = res.filter((item: Cart)=> item?.customer?.customerId === parseInt(this.oService.getCustomerAuthorization()));
          console.log("customer filter::::::",customerFilter);
          this.cartList = customerFilter;
          this.cartListBackup =  _.cloneDeep(customerFilter);
          if (this.cartList.length > 0) {
            this.cartList.map((item: Cart) => {
              this.grandTotal += (item?.mrpPrice * item?.quantity);
            })
          }
        }
      }, _err => {
        console.log("error");
      }

    );
  }
  getTotal(quantity: number = 0, mrpPrice: number = 0): number {
    return quantity * mrpPrice;
  }
  placeOrder(): void {
    let totalPrice: number = 0;
    const deleteCartReq:any[]=[];
    const dishItems: Array<Product> = [];
    this.cartList.forEach((item: Cart) => {
      dishItems.push(item?.product);
      totalPrice += (item?.mrpPrice * item?.quantity);
      deleteCartReq.push(this.oService.deleteCart(item?.cartId));
    });
    console.log('>>>>>>>>', totalPrice)
    const body: any = {
      totalPrice: totalPrice,
      orderStatus: "success",
      paymentStatus: "success",
      orderedDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      customer: this.customer,
      dishname: 'xxxxx',
      image: 'xxxxx',
      dish: dishItems
    };
    this.oService.placeOrderItem(this.customer?.customerId, body).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>>>>', res);
      forkJoin(deleteCartReq).pipe(take(1)).subscribe();
      alert("Place order Sucessfully");
      this.router.navigate(["/customer/order"]);
    })
    /* const req:any[]=[];
    this.cartList.map((item: Cart) => {
      const body: any = {
        mrpPrice: item?.mrpPrice,
        quantity: item?.quantity,
        totalPrice: item?.mrpPrice * item?.quantity,
        orderStatus: "success",
        paymentStatus: "success",
        orderedDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        customer: this.customer,
        cart: item,
        dishname: item?.dish?.dishname,
        image: item?.dish?.image
      };
     
      console.log("add to order", body);
      req.push(this.fService.placeOrder(this.customer?.customerId, item?.cartId, body));
    
    });

     forkJoin(req).pipe(take(1)).subscribe(
        (res: any) => {
          console.log("PLaceorder$$$$$$$$",res);
          alert("Place order Sucessfully");
          this.router.navigate(["/customer/order"])

        }, _err => {
          console.log("Error");
        }); */


  }

  getCustomerDetail(): void {
    const cid = this.oService.getCustomerAuthorization();
    this.oService.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer*****", res);
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, _err => {
        console.log("Err");
      }
    )
  }

  deleteCart(cart:Cart, showAlert: boolean = true):void{
    this.oService.deleteCart(cart?.cartId).pipe(take(1)).subscribe(
      (res: any) => {
        if (showAlert) {
          alert("Dish deleted sucessfully");
        }
       
        this.getCartList();
      }, _err => {
        console.log("Err");
      }
    )
  }

  onIncreaseQunatity(cart: Cart): void {
    const index = this.cartList.findIndex((item: Cart) => item.cartId === cart?.cartId);
    // const bac = Object.assign(this.cartListBackup);
    const qty = cart.quantity + 1;
    this.cartList[index].quantity = qty;
    this.updateGrantTotal();
    return ;
  }

  onDecreaseQunatity(cart: Cart): void {
    const index = this.cartList.findIndex((item: Cart) => item.cartId === cart?.cartId);
    const qty = cart.quantity - 1;
    if (qty === 0) {
      this.deleteCart(cart, false);
    }
    this.cartList[index].quantity = qty;
    this.updateGrantTotal();
  }

  updateGrantTotal(): void {
    let total = 0;
    this.cartList.map((item: Cart) => {
      total+= (item?.mrpPrice * item?.quantity);
     
    })
    this.grandTotal = total;
  }

}


