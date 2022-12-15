import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './mapa.component';

const routes: Routes = [
  {
    path: '',
    component: MapaComponent,
  },  {
    path: 'lector-qr',
    loadChildren: () => import('./lector-qr/lector-qr.module').then( m => m.LectorQrPageModule)
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapaPageRoutingModule {}