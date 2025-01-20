import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { OnlinefoodService } from '../../service/onlinefood.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: false,
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  productList: Array<Product> = [];
  quantity: number = 0;
  customer: any = {};
  getCategoryList: any[] = [];
  category: any = 100;
  allProductList: Array<Product> = [];
  offset: number = 0;
  pageSize: number = 10; // How many items you want to display per page
  totalItem: number = 1;

  // New properties for the search bar
  searchTerm: string = '';
  filteredCategories: any[] = [];

  constructor(
    private oService: OnlinefoodService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.oService.isCustomerLoginPresent();
    this.getProductList(true);
    this.getCustomerDetail();
  }

  ngOnInit(): void {
    this.getCategoryList = this.oService.getCategoryList();
    this.filteredCategories = this.getCategoryList; // Initialize with all categories
  }

  getCustomerDetail(): void {
    const cid = this.oService.getCustomerAuthorization();
    this.oService.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, err => {
        console.error('Error fetching customer details', err);
      }
    );
  }

  getProductList(isAllProduct: boolean = false): void {
    let product: any = this.oService.getAllProducts(this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    if (!isAllProduct) {
      product = this.oService.getProductByCategory(this.category, this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
    }
    product.pipe(take(1)).subscribe((res: any) => {
      if (res && res?.product && Array.isArray(res?.product)) {
        this.productList = res?.product;
        this.allProductList = res?.product;
        this.totalItem = res?.totalProduct;
      }
    }, (err: any) => {
      console.error('Error fetching product list', err);
    });
  }

  addToCart(product: Product): void {
    const element: any = document.getElementById(product?.productId.toString());
    let qty: any = element !== null ? element.value : 0;
    if (qty === '') {
      element.value = 0;
      qty = 0;
    }
    if (qty === 0 || qty === '0') {
      alert('Quantity should not be zero');
      return;
    }
    if (qty > product?.quantity) {
      alert('Added quantity should not exceed available quantity');
      return;
    }

    const body: any = {
      quantity: qty,
      mrpPrice: product?.mrpPrice,
      product: product,
      customer: this.customer
    };
    this.oService.addToCart(body, product?.productId, this.customer?.customerId).pipe(take(1)).subscribe(
      (res: any) => {
        if (!!res && res?.cartId) {
          alert('Item added successfully');
          this.getProductList();
        }
      }, err => {
        console.error('Error adding to cart', err);
      }
    );
  }

  // New method for filtering categories based on the search term
  filterCategories(): void {
    this.filteredCategories = this.getCategoryList.filter(category =>
      category?.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // New method to handle category selection
  selectCategory(category: any): void {
    this.category = category?.value;
    this.searchTerm = category?.name; // Update the input to the selected category name
    this.filteredCategories = []; // Clear the suggestions
    this.getProductByCategory(); // Fetch products for the selected category
  }

  getProductByCategory(): void {
    this.offset = 0;
    this.totalItem = 1;
    if (this.category === 100 || this.category === '100') {
      this.getProductList(true);
    } else {
      this.getProductList(false);
    }
  }

  onNextPageClick(pageOffset: any): void {
    this.offset = pageOffset;
    this.getProductList(this.category === 100 || this.category === '100');
  }

  onPreviousPageClick(pageOffset: any): void {
    this.offset -= 1;
    this.getProductList(this.category === 100 || this.category === '100');
  }

  onFirstPageClick(pageOffset: any): void {
    this.offset = 0;
    this.getProductList(this.category === 100 || this.category === '100');
  }

  onLastPageClick(pageOffset: any): void {
    const lastPage = Math.ceil(this.totalItem / this.pageSize);
    this.offset = lastPage;
    this.getProductList(this.category === 100 || this.category === '100');
  }
}


// import { Component, OnInit } from '@angular/core';
// import { Product } from '../../model/product.model';
// import { OnlinefoodService } from '../../service/onlinefood.service';
// import { Router } from '@angular/router';
// import { take } from 'rxjs';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   standalone:false,
//   selector: 'app-customer-home',
//   templateUrl: './customer-home.component.html',
//   styleUrls: ['./customer-home.component.css']
// })
// export class CustomerHomeComponent implements OnInit {

//   productList: Array<Product> = [];
//   quantity: number = 0;
//   customer: any = {};
//   getCategoryList: any[] = [];
//   category: any = 100;
//   allProductList : Array<Product>= [];
//   offset: number = 0;
//   pageSize: number = 10; // How many item you want to display in your page.
//   totalItem: number = 1;

//   constructor(
//     private oService: OnlinefoodService,
//     private router: Router,
//     private snakcbar: MatSnackBar
//   ) {
//    this.oService.isCustomerLoginPresent();
//     this.getProductList(true);
//     this.getCustomerDetail();
//   }


//   ngOnInit(): void {
//     this.getCategoryList = this.oService.getCategoryList();
//   }

//   getCustomerDetail(): void {
//     const cid = this.oService.getCustomerAuthorization();
//     this.oService.getCustomerById(cid).pipe(take(1)).subscribe(
//       (res: any) => {
//         console.log("Customer*****", res);
//         if (!!res && res?.customerId) {
//           this.customer = res;
//         }
//       }, err => {
//         console.log("Err");
//       }
//     )
//   }

//   getProductList(isAllProduct: boolean = false): void {
//     let product: any = this.oService.getAllProducts(this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
//     if (!isAllProduct) {
//       product = this.oService.getProductByCategory(this.category, this.offset - 1 < 0 ? 0 : this.offset - 1, this.pageSize);
//     }
//     product.pipe(take(1)).subscribe((res: any) => {
//       ;
//       if (res && res?.product && Array.isArray(res?.product)) {
//         this.productList = res?.product;
//         this.allProductList = res?.product;
//         this.totalItem = res?.totalProduct;
//       }
//     }, (err: any) => {
//       console.log("Error");
//     });
//   }

//   addToCart(product: Product): void {
//     const element: any = document.getElementById(product?.productId.toString());
//   let qty:any= element!==null ? element.value : 0; 
//   if(qty ===""){
//     element.value=0;
//     qty=0;
//   }
//     if (qty === 0 || qty === "0") {
//       alert("Qunatity should not be zero");
//       return ;
//     }
//     if (qty > product?.quantity) {
//       alert('Added quantity should not greater than available quantity');
//       return;
//     }
    
//     const body: any = {
//       quantity: qty,
//       mrpPrice: product?.mrpPrice,
//       prouct: product,
//       customer: this.customer
//     };
//     console.log("add to cart", body);
//     this.oService.addToCart(body, product?.productId, this.customer?.customerId).pipe(take(1)).subscribe(
//       (res: any) => {
//         console.log(res);
//         if (!!res && res?.cartId) {
//         alert("Item added sucessfully");
//           this.getProductList();
//         }
//       }, err => {
//         console.log("Error");
//       }
//     )
//   }

//   getProductByCategory(): void {
//     this.offset = 0;
//     this.totalItem = 1;
//     if (this.category === "100") {
//       this.getProductList(true);
//     } else {
//       this.getProductList(false);
//     }
//   }

//   onNextPageClick(pageOffSet: any): void {
//     this.offset = pageOffSet;
//     this.getProductList(this.category === 100 || this.category === "100");
//   }

//   onPreviousPageClick(pageOffSet: any): void {
//     this.offset -= 1;
//     this.getProductList(this.category === 100 || this.category === "100");
//   }

//   onFirstPageClick(pageOffSet: any): void {
//     this.offset = 0;
//     this.getProductList(this.category === 100 || this.category === "100");
//   }

//   onLastPageClick(pageOffSet: any): void {
//     const lastPage = Math.ceil(this.totalItem / this.pageSize);
//     this.offset = lastPage;
//     this.getProductList(this.category === 100 || this.category === "100");
//   }

// }





