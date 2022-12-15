import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Homes } from '../../homes';
import { AuthProvider, getAuth } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQrPage implements OnDestroy {

  qrCodeString = 'This is a qr code message';
  resultadoEscaneo: any;
  visibilidad : string;
  scannedResult: any;
  content_visibility = '';
  usuario = [] ;

  constructor(private alertController: AlertController, private fire : FirebaseService){
      this.validacionLogin();
    }

    ionViewWillEnter() {
      this.validacionLogin();
    }



 async checkPermission(){
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err)
    }
  }

  async startScan(){ 
    try {
      const permiso = await this.checkPermission();
      if (!permiso) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.visibilidad = 'hidden';
      const resultado = await BarcodeScanner.startScan();
      console.log(resultado);
      if (resultado?.hasContent) {
        this.resultadoEscaneo = resultado.content;
        BarcodeScanner.showBackground();
        document.querySelector('body').classList.remove('scanner-active');
        this.visibilidad = 'visible';
        console.log(this.resultadoEscaneo);
        this.presentAlert();
        this.actConductor();
      }
    } catch (err) {
      console.log(err);
      this.stopScan();
    }
  }

  data : Homes
  condupath : string;

  async actConductor() {
    this.data ={
      id : this.usuarioid,
      nombre    : this.usuarioNombre,
      patente   : this.usuarioPatente, 
      imagen    : this.usuarioImagen,
      precio    : this.usuarioPrecio, 
      capacidad : this.usuarioCapacidad, 
      tipoAuto  : this.usuarioTipoAuto,
      hora      : this.usuarioHora,
      area      : this.usuarioArea,
    }
    this.condupath = 'Homes/' + this.resultadoEscaneo + '/UsuarioDuoc'
    this.fire.createDoc(this.data,this.condupath,this.usuarioid)
  }


  usuarioNombre    : string;
  usuarioid        : any;
  usuarioPatente   : string;
  usuarioImagen    : string;
  usuarioPrecio    : string; 
  usuarioCapacidad : string; 
  usuarioTipoAuto  : string;
  usuarioHora      : string;
  usuarioArea      : string;

  async validacionLogin(){
    const auth = getAuth()
    this.usuarioNombre = auth.currentUser.email;
    this.usuarioid = auth.currentUser.uid;
    console.log(this.usuarioid,' - ',this.usuarioNombre);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Viaje registrado',
      buttons: ['OK'],
    });

    await alert.present();
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.visibilidad = 'visible';
  }

  ngOnDestroy() {
      this.stopScan();
  }

}