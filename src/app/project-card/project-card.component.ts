import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'app/models/project';
import * as moment from 'moment';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input('project') project: Project;
  @Input() stylesObj: any = {};
  id; 
  formatdate;
  //@Input('show-actions') showActions = true;
  //@Input('shopping-cart') projectCart: ShoppingCart;
 
  //private cartService: ShoppingCartService
  constructor(private router: Router) { 
    //let aday = moment(this.project.applicationdeadline);
    //this.minDate = moment(aday).subtract(1, 'days').toISOString();
  }

  ngOnInit() {
    //this.formatdate = moment(this.project.applicationdeadline).format('LL');
    this.formatdate = moment(this.project.applicationdeadline).format("MMM Do YYYY");
    this.id = this.project._id;
  }

  addToCart() {
    //this.cartService.addToCart(this.product);
  }

  loadFullProject() {
    //console.log(this.id);
    this.router.navigate(['/projectdetails/'+ this.id]);
  }
} 
