import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HomeService } from '../home.service';
import { Homes } from '../homes';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
//import { ModalExampleComponent } from '..detalle/';
import Swal from 'sweetalert2';
import { FirebaseService } from 'src/app/services/firebase.service';



@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  conductor: Homes
  handlerMessage = '';
  roleMessage = '';
  showModal: any;

  
  
  constructor(private activatedRoute: ActivatedRoute,
              private servicio: HomeService,
              private alerta: AlertController,
              private router: Router ,
              private modalCtrl: ModalController,
              private alertController: AlertController,
              private translateService: TranslateService,
              private fire: FirebaseService) { }

              

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      this.conductor = this.servicio.obtenerHome(paramMap.get('id'))
      console.log(paramMap.get('id'))
      console.log(this.conductor)
    })
  }

  async  eliminar() {
    console.log("Eliminado")
    const aux = await this.alerta.create({
      header: 'Eliminar',
      message: 'Estas seguro de eliminar el dato?',
      buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
          text: 'Eliminar',
          handler: () => {
            this.servicio.eliminarHome(this.conductor.id)
            this.router.navigate(['/home'])
          }
        } 
      ]
    })

    await aux.present();

  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: '¿Está seguro de Continuar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }

  
}
