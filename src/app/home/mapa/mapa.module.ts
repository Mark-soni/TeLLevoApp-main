import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MapaPageRoutingModule } from './mapa-routing.module';

// CAMBIO IDIOMA
import { TranslateModule } from '@ngx-translate/core';
import { MapaComponent } from './mapa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaPageRoutingModule,
    TranslateModule
  ],
  declarations: [MapaComponent]
})
export class MapaModule {}