import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Usuario } from '../login/usuario';
import { Usuariotemporal } from '../interfaces/usuariotemporal';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: AngularFireAuth,
              private database: AngularFirestore,
              private loading: LoadingController,
              private toastController:ToastController) { }
              
//data = objeto, path = collecion, id: id
  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }
  //OK
  getDoc<tipo>(path: string, id: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }
  //OK
  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }
 //OK
  getId() {
    return this.database.createId();
  }   
  //OK    
  getCollection<tipo>(path: string) {
  const collection = this.database.collection<tipo>(path);
  return collection.valueChanges();
  }

  //OK
  async mensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration:1500,
      //position: 'top'  | 'middle' |  'bottom'
      position: 'bottom'
    });
    
  //OK
    await toast.present();
  }
  //OK  
  loadingAux: any;
  //OK 
  async cargarLoading(mensaje: string) {
    this.loadingAux = await this.loading.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      //duration: 2000
    });
  //OK 
    await this.loadingAux.present();
  }
  //OK
  
  async cerrarLoading() {
    await this.loadingAux.dismiss();
  }

  async logout() {
    await this.auth.signOut();
  }

  async login(correo: string, pass: string) {
    const { user } = await this.auth.signInWithEmailAndPassword(correo, pass);
    return user;
  }

  async registrar2(usuario: string, email: string, pass: string, tipo: string) {
    try{
      const { user } = await this.auth.createUserWithEmailAndPassword(email, pass);
      this.guardarU(usuario , email, pass, tipo) 
      await this.verificacion();
      return user;
    } catch (Error) {
      console.log(Error);
    }
  }

  async guardarU(user: string, email: string, pass: string, tipo: string) {
    const usuariotemp: Usuariotemporal = {
      uid: this.getId(),
      user: user,
      email: email,
      pass: pass,
      tipo: tipo,
    };

    if (usuariotemp) {
      this.createDoc(usuariotemp,'UsuarioDuoc', usuariotemp.uid);
      this.mensaje('Verifique su correo');
      console.log(usuariotemp);
    }
  }

  async verificacion() {
    return (await this.auth.currentUser).sendEmailVerification();
  }

  async recuperar(correo: string) {
    return this.auth.sendPasswordResetEmail(correo);
  }

  async obtenerEmail() {
    return (await this.auth.currentUser).email;
  }

  async obtenerUsuario() {
    const aux: Usuario = await this.auth.currentUser;
    return aux;
  }

}