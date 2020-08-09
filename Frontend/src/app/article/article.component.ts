import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() lang;
  constructor() { }

  ngOnInit() {
    console.log('yo')
  }

  articles = [{
    img:'../../assets/book1.jpg',
    link:'',
    language:'English' , id:'dfwe232r345'
  },{
    img:'../../assets/book2.jpg',
    link:'',
    language:'English' , id:'dfwe232r345'
  },{
    img:'../../assets/book3.jpg',
    link:'',
    language:'Hindi' , id:'dfwe232r345'
  }]

  countClicks(id:string)
  {

  }

}
