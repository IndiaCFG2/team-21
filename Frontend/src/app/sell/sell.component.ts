import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

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

  form = false

  openForm()
  {
    this.form = !this.form;
  }

}
