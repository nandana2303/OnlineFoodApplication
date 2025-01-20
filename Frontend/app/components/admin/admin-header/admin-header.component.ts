import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OnlinefoodService } from '../../service/onlinefood.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  standalone:false,
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class 
AdminHeaderComponent implements OnInit {
  url: string = '';
  userName: string = '';
  constructor(
    private oService :OnlinefoodService,
    private router:Router,
    private changeDetector: ChangeDetectorRef
  ) {
    if (this.oService.getAdminName() !== null) {
      this.userName = this.oService.getAdminName();
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
    if (link === '/admin/logout') {
      this.oService.customerLogout();
      return;
    }
    this.router.navigate([link]);
  }

}