import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { OnlinefoodService } from './components/service/onlinefood.service';
import { filter } from 'rxjs';

@Component({
standalone:false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlineFoodSystem';
  isLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  
  constructor(
    private router:Router,
    private oService:OnlinefoodService)
    {
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
      ).subscribe((event: any) => {
        if (this.oService.getCustomerAuthorization() !== null) {
          setTimeout(() => {
            this.isLoggedIn = true;
            this.isAdminLoggedIn = false;
          }, 100);
        } else {
          if (this.oService.getAdminAuthorization() !== null) {
            setTimeout(() => {
              this.isAdminLoggedIn = true;
              this.isLoggedIn = false;
            }, 100);
  
          } {
            setTimeout(() => {
              this.isLoggedIn = false;
              this.isAdminLoggedIn = false;
            }, 1);
          }
        }
      });
  //line 20 to 41-->check when routing(url) change it will check authorization
    }
  
}
