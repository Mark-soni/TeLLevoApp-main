import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetallePageModule } from './home/detalle/detalle.module';
import { MapaComponent } from './home/mapa/mapa.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'home',
    //loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: '',
        loadChildren: () => import('./home/detalle/detalle.module').then(m => m.DetallePageModule)
      },
      {
        path: ':id', component : MapaComponent
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pass-resset',
    loadChildren: () => import('./pass-resset/pass-resset.module').then( m => m.PassRessetPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'home-conductor',
    loadChildren: () => import('./home-conductor/home-conductor.module').then( m => m.HomeConductorPageModule)
  },
  {
    path: "agregar",
    loadChildren: () => import('./home/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'splashscreen',
    loadChildren: () => import('./splashscreen/splashscreen.module').then( m => m.SplashscreenPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'strapip',
    loadChildren: () => import('./strapip/strapip.module').then( m => m.StrapipPageModule)
  },
  {
    path: 'detalle',
    loadChildren: () => import('./home/detalle/detalle.module').then(m => m.DetallePageModule)
  },
  {
    path: 'qr-generate',
    loadChildren: () => import('./home-conductor/qr-generate/qr-generate.module').then( m => m.QrGeneratePageModule)
  },
  {
    path: 'lector-qr',
    loadChildren: () => import('./home/mapa/lector-qr/lector-qr.module').then( m => m.LectorQrPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
