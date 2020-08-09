import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  biddings = [
    {
      name:'asfafd',
      price:40000
    },
    {
      name:'asfadvdsdfd',
      price:38000
    },
    {
      name:'asfafsdfdd',
      price:36000
    },
    {
      name:'wqqwrasfafd',
      price:33000
    },
    {
      name:'asasfasfafd',
      price:30000
    },
  ]

}
