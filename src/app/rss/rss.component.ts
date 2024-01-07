import { Component, OnInit } from '@angular/core';
import { RssService } from '../services/rss/rss.service';
import { RssFeed } from '../model/rssFeed';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-rss',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './rss.component.html',
  styleUrl: './rss.component.css'
})
export class RssComponent implements OnInit{
    
    public rssFeed?: RssFeed;

    constructor(private rssService: RssService){

    }
    
    ngOnInit(): void {
        this.rssService.getRssFeed().subscribe((data: any)=>{
            this.rssFeed = data;
            console.log(data);
        });
    }
}
