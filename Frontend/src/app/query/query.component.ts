import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  @Input() lang;
  constructor() { }

  ngOnInit() {
  }

  queries = [{
    question:"The very First Question..?",
    answer:'',
    id:'',
    open:false,
    lang:'english'
  },{
    question:"The very second Question..?",
    answer:'',
    id:'',
    open:false,
    lang:'english'
  },{
    question:"The very next Question..?",
    answer:'',
    id:'',
    open:false,
    lang:'english'
  },{
    question:"The last and final Question..?",
    answer:'',
    id:'',
    open:false,
    lang:'english'
  }]

  openquestion(idx)
  {
    console.log(idx)
      this.queries[idx].open = !this.queries[idx].open
  }

}
