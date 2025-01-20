import { Component, OnInit } from '@angular/core';
import { OnlinefoodService } from '../../service/onlinefood.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  standalone:false,
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {
  url: string = "/customer/home";
  userName: string = '';
  constructor(
    private oService :OnlinefoodService,
    private router:Router
  ) {
    if (this.oService.getCustomerName() !== null) {
      this.userName = this.oService.getCustomerName();
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.url = event?.url;
    });
  }
  routerToLink(link: string): void {
    if (link === '/customer/logout') {
      this.oService.customerLogout();
      return;
    }
    this.router.navigate([link]);
  }

}
