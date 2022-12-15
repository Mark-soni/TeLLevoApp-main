import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MostarapiService {

  API = "https://rickandmortyapi.com/api/character"
  
  constructor(private cliente: HttpClient) { }

  obtenerdigimon(){
    return this.cliente.get("https://rickandmortyapi.com/api/character")
  }
  
  eliminardigimon(id : string){
    return this.cliente.delete(`${this.API}/${id}`)
  }

  

}