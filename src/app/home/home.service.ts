import { Injectable } from '@angular/core';
import { Homes } from './homes';
import { MenuController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private conductor: Homes[] = [
      
  ]

  
  constructor() { }

  obtenerHomes() {
    return [...this.conductor]
  }

  obtenerHome(id: string) {
    return {
      ...this.conductor.find(aux => {
        return aux.id === id
      })
    }
  }

  agregarHome(nombre: string, patente: string, imagen: string, precio: string, capacidad: string, tipoAuto: string, hora: string, area: string) {
    this.conductor.push({
      nombre, patente, imagen, precio, capacidad, tipoAuto, hora , area , id: this.conductor.length + 1 + ""
    })
  }

  eliminarHome(id: string) {
    this.conductor = this.conductor.filter(aux => {
      return aux.id !== id 
    })
  }

}