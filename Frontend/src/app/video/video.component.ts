import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() lang;
  constructor() { }

  ngOnInit() {
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  ylinks = [
    {
      title:'Some title',
      description:'something',
      link:'1IOaSyr2Kr4',
      id:'',language:'english'
    },
    {
      title:'Some title',
      description:'something',
      link:'FyOzeO6fQwI',
      id:'',language:'english'
    },
    {
      title:'Some title',
      description:'something',
      link:'cBBOQQwbQVk',
      id:'',language:'Hindi'
    },
    {
      title:'Some title',
      description:'something',
      link:'1IwKWYNycj8',
      id:'',language:'english'
    }
  ]

}
