///<reference path="C:/Users/marce/OneDrive/Escritorio/TeLLevoApp-main-main/node_modules/@types/googlemaps/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2'
import { MenuController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { HomeService } from '../home/home.service';
import { Homec } from './homec';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms'
import { ElementRef, ViewChild, Renderer2 } from '@angular/core'



@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.page.html',
  styleUrls: ['./home-conductor.page.scss'],
})
export class HomeConductorPage implements OnInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  cliente: string
  conductor = []
  usuario: any;
  langs: string[] = [];
  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;
  formMapas!: FormGroup;
  longitudvar : any;
  latitudvar : any;

  constructor(private servicio: HomeService,
              private router: Router,
              private menu: MenuController,
              private activatedRoute: ActivatedRoute,
              private alerta: AlertController,
              private fire: FirebaseService,
              private translateService: TranslateService,
              private renderer: Renderer2) {
                this.langs = this.translateService.getLangs();
                this.markers = [];

              this.formMapas = new FormGroup({

                  busqueda: new FormControl(''),
                  direccion: new FormControl(''),
                  referencia: new FormControl(''),
                  ciudad: new FormControl(''),
                  provincia: new FormControl(''),
                  region: new FormControl('')
    })
      
    }


    ngOnInit() {
      this.validacion();
  }

  ngAfterViewInit(): void {

    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log('longitude =>',position.coords.longitude)
        this.longitudvar = position.coords.longitude;
        this.latitudvar = position.coords.latitude;
        console.log('latitude =>',position.coords.latitude)
        await this.cargarMapa(position);

      }, null, opciones);


    } else {
      console.log("navegador no compatible")
    }

  };



  onSubmit() {
    console.log("Datos del formulario: ", this.formMapas.value)
  };


  //calcular ruta
  mapRuta() {

    const directionService = new google.maps.DirectionsService();
    const directionRender = new google.maps.DirectionsRenderer();

    directionRender.setMap(this.mapa);

    directionService.route({

      origin: 'Quilpué, Chile',
      destination: 'Viña del Mar, Chile',
      travelMode: google.maps.TravelMode.DRIVING

    }, resultado => {
      console.log(resultado);
      directionRender.setDirections(resultado);

      this.distancia = resultado.routes[0].legs[0].distance.text;

    });

  }



  


    

  llenarFormulario(place: any) {

    const addressNameFormat: any = {
      'street_number': 'short_name',
      'route': 'long_name',
      'administrative_area_level_1': 'short_name',
      'administrative_area_level_2': 'short_name',
      'administrative_area_level_3': 'short_name',
      'country': 'long_name',

    };

    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {

          return component[addressNameFormat[type]];
        }
      }
      return ' '
    };

    const componentForm = {
      direccion: 'location',
      ciudad: "administrative_area_level_3",
      provincia: 'administrative_area_level_2',
      region: 'administrative_area_level_1'
    };




    Object.entries(componentForm).forEach(entry => {
      const [key, value] = entry;

      this.formMapas.controls[key].setValue(getAddressComp(value))
    });

    this.formMapas.controls['direccion'].setValue(getAddressComp('route') + ' ' + getAddressComp('street_number'))
  };

  cargarMapa(position: any): any {

    const opciones = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.mapa = new google.maps.Map(this.renderer.selectRootElement(this.divMap.nativeElement), opciones)

    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      title: "David",
    });

    markerPosition.setMap(this.mapa);
    this.markers.push(markerPosition);
  };

  ionViewWillEnter() {
    //this.conductor = this.servicio.obtenerHomes()= ya no se usa
    this.validacion();
  }

  validacion() {
    this.fire.obtenerUsuario().then(
      (resp) => {
        if (resp.emailVerified){
        this.obtenerHomec();
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

  obtenerHomec() {
    this.fire.getCollection<HomeConductorPage>('conductor').subscribe(
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
            const homc : Homec = {
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
            this.fire.createDoc(homc, 'Homec', homc.id).then(
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
