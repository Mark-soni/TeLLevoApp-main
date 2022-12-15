import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrapipPage } from './strapip.page';

// CAMBIO IDIOMA
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: StrapipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    TranslateModule],
  exports: [RouterModule],
})
export class StrapipPageRoutingModule {}
