import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrGeneratePageRoutingModule } from './qr-generate-routing.module';

import { QrGeneratePage } from './qr-generate.page';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrGeneratePageRoutingModule,
    QRCodeModule,
    TranslateModule
  ],
  declarations: [QrGeneratePage]
})
export class QrGeneratePageModule {}