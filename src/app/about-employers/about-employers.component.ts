import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-employers',
  templateUrl: './about-employers.component.html',
  styleUrls: ['./about-employers.component.css']
})
export class AboutEmployersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  registerEmployer() {
    this.router.navigate(['/signup/employer']);
  }
  //routerLink="/signup/employer"

}
