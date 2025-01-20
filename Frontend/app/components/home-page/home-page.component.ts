import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone:false,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomePageComponent implements OnInit {
  logo:string="/assets/Images/logo1.png";
  images = [
     '../../../assets/Images/bannerB.avif',
     '../../../assets/Images/baneerA.jpg',
     '../../../assets/Images/bannerD.avif'
 ];
 
   constructor(
     config: NgbCarouselConfig,
     private route: Router
   ) {
     config.interval = 2000;
     config.keyboard = false;
     config.pauseOnHover = false;
   }
 
   ngOnInit(): void {
   }
 
   gotoLogin(): void {
     this.route.navigate(['/customer-login'])
   }
 
 }
 