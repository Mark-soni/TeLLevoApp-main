import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { GuardarService } from '../services/guardar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pass-resset',
  templateUrl: './pass-resset.page.html',
  styleUrls: ['./pass-resset.page.scss'],
})
export class PassRessetPage implements OnInit {

  constructor(private alertController: AlertController, private router: Router, private servicio: FirebaseService,private guardar: GuardarService,private translateService: TranslateService) { 
    this.langs = this.translateService.getLangs();}
    
    langs: string[] = [];

  ngOnInit() {
    this.obtenerPalabrasPA();
  }

  msgPA : string
  creacionPA : string
  suxPA : string
  mensa2 : string
  mensa3 : string

  async obtenerPalabrasPA() {
    this.translateService.get('El usuario a sido creado existosamente.').subscribe(
      (res: string) => {
        this.msgPA = res
      }
    )
    this.translateService.get('Alerta').subscribe(
      (res: string) => {
        this.creacionPA = res
      }
    )
    this.translateService.get('Correo Enviado').subscribe(
      (res: string) => {
        this.suxPA = res
      }
    )
    this.translateService.get('Le hemos enviado una nueva contraseña').subscribe(
      (res: string) => {
        this.mensa2 = res
      }
    )
    this.translateService.get('OK').subscribe(
      (res: string) => {
        this.mensa3 = res
      }
    )
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.creacionPA,
      subHeader: this.suxPA,
      message: this.mensa2,
      buttons: [this.mensa3],
    });
    await alert.present();
  }

  async onReset(email) {
    if ((email.value).length === 0) {
    }else {
      this.servicio.recuperar(email.value)
      await this.presentAlert();
      await this.router.navigate(['home'])
    }
  }
}
