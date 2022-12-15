import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassRessetPageRoutingModule } from './pass-resset-routing.module';

import { PassRessetPage } from './pass-resset.page';

// CAMBIO IDIOMA
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassRessetPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [PassRessetPage]
})
export class PassRessetPageModule {}
