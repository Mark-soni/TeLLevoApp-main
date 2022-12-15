import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HomeService } from './home.service';
import Swal from 'sweetalert2'
import { MenuController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { Homes } from './homes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  cliente: string
  conductor = []
  usuario: any;
  langs: string[] = [];

  constructor(private servicio: HomeService,
              private router: Router,
              private menu: MenuController,
              private activatedRoute: ActivatedRoute,
              private alerta: AlertController,
              private fire: FirebaseService,
              private translateService: TranslateService) {
                this.langs = this.translateService.getLangs();
  }            

  ngOnInit() {
      this.validacion();
      this.obtenerHomes(); 
  }

  ionViewWillEnter() {
    this.validacion();
    this.obtenerHomes();
  }

  validacion() {
    this.fire.obtenerUsuario().then(
      (resp) => {
        if (resp.emailVerified){
        this.obtenerHomes();
        this.usuario = resp.email;
      } else {
        this.mensajeError();
      }
      },
      (err) => {
        
      }
    )
  }

  async mensajeError() {
    const alert = await this.alerta.create({
      header: 'Error',
      message: 'Para poder usar la app, debe validar el correo',
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });
  
    await alert.present();
  }

  obtenerHomes() {
    this.fire.getCollection<HomePage>('conductor').subscribe(
      (res) => {
        this.conductor = res;
        console.log(res)
      },
      (err) => {

      }
    )
  }

  async agregar() {
    //console.log("agregar")
    const alert = await this.alerta.create({
      header: 'Agregar Personaje!',
      inputs: [
        {
          name: 'txtNombre',
          placeholder: 'Nombre'
        },
        {
          name: 'txtPatente',
          placeholder: 'Patente'
        },
        {
          name: 'txtImagen',
          placeholder: 'Imagen'
        },
        {
          name: 'txtPrecio',
          placeholder: 'Precio'
        },
        {
          name: 'txtCapacidad',
          placeholder: 'Capacidad'
        },
        {
          name: 'txttipoAuto',
          placeholder: 'tipoAuto'
        },
        {
          name: 'txthora',
          placeholder: 'hora'
        },
        {
          name: 'txtArea',
          placeholder: 'area'
        },
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'canel',
        },
        {
          text: 'Guardar',
          handler: data => {
            //(No se usan mas) this.servicio.agregarHome(data.txtId,data.txtNombre,data.txtPatente,data.txtImagen,data.txtPrecio,data.txtCapacidad,data.txtTipoAuto,data.txtHora,data.txtArea)
            //(No se usan mas) this.ionViewWillEnter();
            const hom : Homes = {
              id        : this.fire.getId(),
              nombre    : data.txtNombre,
              patente   : data.txtPatente,
              imagen    : data.txtImagen,
              precio    : data.txtPrecio, 
              capacidad : data.txtCapacidad, 
              tipoAuto  : data.txtTipoAuto,
              hora      : data.txtHora,
              area      : data.txtArea
          }
            this.fire.cargarLoading("Almacenando personaje...")
            this.fire.createDoc(hom, 'Home', hom.id).then(
              (res) => {
                this.fire.cerrarLoading()
                this.fire.mensaje("Conductor almacenado!")
              }
            )
          },
        },
      ],
    });
      
    await alert.present();
}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async logout() {
    this.fire.logout();
    this.router.navigate(['/login']);
  }

  //doStart(event) {
    //console.log('Estoy en start');

  //}
  
  //doPull(event) {
    //console.log('Estoy en pull');
  //}

  //doRefresher(event) {
    //console.log('Estoy en refresher');
    //console.log('Begin async operation');
    
    //setTimeout(() => {
      //console.log('Async operation has ended');
    //event.target.complete();
    //}, 2000);
  //}


}