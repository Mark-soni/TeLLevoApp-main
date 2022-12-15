import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home.service';
import { AlertController, ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { TranslateService } from '@ngx-translate/core';
import { Homes } from '../homes';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  private conductor: Homes[] = [
      
  ]


  constructor(private activatedRoute: ActivatedRoute,
    private servicio: HomeService,
    private alerta: AlertController,
    private router: Router ,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private translateService: TranslateService,
    private fire: FirebaseService) { }

  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Su viaje se programo',
      message: 'Su viaje esta publicado',
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit() {
  }
  
  async agregar() {
    //console.log("agregar")
    const alert = await this.alerta.create({
      header: 'Agregar Conductor!',
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
          placeholder: 'Imagen:'
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
          name: 'txtTipoAuto',
          placeholder: 'tipoAuto:'
        },
        {
          name: 'txtHora',
          placeholder: 'Hora:'
        },
        {
          name: 'txtArea',
          placeholder: 'Area:'
        },
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
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
            this.fire.cargarLoading("Almacenando conductor...")
            this.fire.createDoc(hom, 'conductor', hom.id).then(
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

}
