import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeConductorPage } from './home-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: HomeConductorPage
  },
  {
    path: 'qr-generate',
    loadChildren: () => import('./qr-generate/qr-generate.module').then( m => m.QrGeneratePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeConductorPageRoutingModule {}
