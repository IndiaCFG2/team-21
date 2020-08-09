import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-khub',
  templateUrl: './khub.component.html',
  styleUrls: ['./khub.component.css']
})
export class KhubComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  source: string;

  english = true;
  hindi = true;

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { order: "popular" }
        this.source = params.source;
        console.log(this.source); // popular
      }
    );
  }

  getlang()
  {
    if(this.english&&this.hindi)return 3;
    if(this.english ) return 1
    if(this.hindi) return 2
  }

}
