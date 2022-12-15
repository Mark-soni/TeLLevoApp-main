import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  darkMode: boolean = true;
  langs: string[] = [];
  idioma = [];

  constructor(private translateService: TranslateService) {
    this.langs = this.translateService.getLangs(); }

  toggleTheme(event) {
    if(event.detail.checked){
      document.body.setAttribute('color-theme','dark')
    }else{
      document.body.setAttribute('color-theme','light')
    }
  }

  ngOnInit() {
  }

  changeLang(event) {
    this.translateService.use(event.detail.value);
    //console.log(event.detail.value)
  }

}
