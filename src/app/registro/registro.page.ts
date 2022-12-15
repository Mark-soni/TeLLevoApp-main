import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { GuardarService } from '../services/guardar.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private servicio: FirebaseService, private router: Router, private guardar: GuardarService ,private translateService: TranslateService ) { 
    this.langs = this.translateService.getLangs();}

    langs: string[] = [];
  ngOnInit() {
    this.obtenerPalabrasPA();
    this.obtenerPalabrasPA();
  }


  msgPA : string
  creacionPA : string
  suxPA : string
  
  async obtenerPalabrasPA() {
    this.translateService.get('El usuario a sido creado existosamente.').subscribe(
      (res: string) => {
        this.msgPA = res
      }
    )
    this.translateService.get('Creación de cuenta').subscribe(
      (res: string) => {
        this.creacionPA = res
      }
    )
    this.translateService.get('Se ha creado su cuenta').subscribe(
      (res: string) => {
        this.suxPA = res
      }
    )
  }

  async registrar(user, email, pass, tipo) {
    try{
      const aux = this.servicio.registrar2(user.value, email.value, pass.value, tipo.value)
      if (aux) {
        console.log(user)
        this.servicio.mensaje(this.msgPA)
      }
    } catch (error){
      console.log('Error->',error)
    }
  }
}




