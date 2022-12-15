import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Homes } from '../home/homes';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  conductor : any;
  pasajero : any;
  condupath : string;

  constructor(private activateRoute: ActivatedRoute, private fire: FirebaseService) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe( paramMap => {
      this.conductor = paramMap.get('id')
      console.log(paramMap.get('id'))
    })

    this.obtenerCondu();
  }

  async obtenerCondu() {
    this.condupath = 'UsuarioDuoc/' + this.conductor + '/conductor'
    console.log(this.condupath)
    this.fire.getCollection<Homes>(this.condupath).subscribe(
      (res) => {
        console.log(res)
        this.conductor = []
        res.forEach( ( x ) => {

          this.conductor.push( x );
      } );
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
