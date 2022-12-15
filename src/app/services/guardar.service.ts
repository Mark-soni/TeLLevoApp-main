import { Injectable } from '@angular/core';
import { Usuariotemporal } from '../interfaces/usuariotemporal';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GuardarService {

  constructor(private servicio: FirebaseService ) { }

  async guardarU(user: string, email: string, pass: string, tipo: string) {
    const usuariotemp: Usuariotemporal = {
      uid: this.servicio.getId(),
      user: user,
      email: email,
      pass: pass,
      tipo: tipo,
    };

    if (usuariotemp) {
      this.servicio.createDoc(usuariotemp,'UsuarioDuoc', usuariotemp.uid);
      this.servicio.mensaje('Usario registrado');
      console.log(usuariotemp);
    }
  }

}

