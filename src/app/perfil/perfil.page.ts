import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import Swal from 'sweetalert2'
import { MenuController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

    cliente: string
    conductor = []
    Titulo = "Auto Disponibles"
    usuario: any;
    doPuLl: any;
  
    constructor(
                private menu: MenuController,
                private activatedRoute: ActivatedRoute,
                private alerta: AlertController,
                private fire: FirebaseService) {}
  
    ngOnInit() {
        this.validacion();
    }
  
    validacion() {
      this.fire.obtenerUsuario().then(
        (resp) => {
          if (resp.emailVerified){
          this.obtenerHomes();
          this.usuario = resp.email;
        } 
        },
        (err) => {
          
        }
      )
    }

    toggleTheme(event) {
      if(event.detail.checked){
        document.body.setAttribute('color-theme','dark')
      }else{
        document.body.setAttribute('color-theme','light')
      }
    }
  
    
  
    obtenerHomes() {
      this.fire.getCollection<PerfilPage>('conductor').subscribe(
        (res) => {
          this.conductor = res;
          console.log(res)
        },
        (err) => {
  
        }
      )
    }
  
 doStart(event) {
    console.log('Estoy en start');

  }
  
  doPull(event) {
    console.log('Estoy en pull');
  }

  doRefresher(event) {
    console.log('Estoy en refresher');
    console.log('Begin async operation');
    
    setTimeout(() => {
      console.log('Async operation has ended');
    event.target.complete();
    }, 2000);
  }

}
