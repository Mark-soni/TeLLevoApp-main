import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { MostarapiService } from './mostarapi.service';


@Component({
  selector: 'app-strapip',
  templateUrl: './strapip.page.html',
  styleUrls: ['./strapip.page.scss'],
})
export class StrapipPage implements OnInit {

  characters: any = []
  
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.http
      .get<any>("https://rickandmortyapi.com/api/character")
      .subscribe((res) => {
        console.log(res)
        this.characters = res.results;
      });
  }
  
  

}

