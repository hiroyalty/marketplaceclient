import { Banner } from './../models/banner';
import { BannerService } from './../services/banner.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/primeng';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  banner: Banner;
  imageLinkk;
  imageLinks;
  cover;
  repeat;
  errorMessage;
  constructor(
    private bannerService: BannerService,
    private sanitization: DomSanitizer
  ) { 
    this.bannerService.getBannerNoOptions()
      .subscribe(dat => {
        this.banner = dat;
        this.imageLinks = this.banner.imageLink;
        console.log(this.imageLinks)
      },
      errorMessage => { 
        //this.notificationsService.notify("error", 'Deletion Failed', 'Project Deletion Failed');
        this.errorMessage = <any>errorMessage;
      });
  }
  
  ngOnInit() {
    //this.imageLinkk = this.sanitization.bypassSecurityTrustStyle(`url(${this.banner.imageLink})`);
  }

  getBackground(image) {
    return this.sanitization.bypassSecurityTrustStyle(`url(${this.imageLinks})`);
  }
}
