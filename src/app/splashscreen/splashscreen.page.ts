import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
})
export class SplashscreenPage implements OnInit {

  constructor(private router: Router) { 
    setTimeout( () => {
      this.router.navigateByUrl('login');
    }, 2300);
  }

  ngOnInit() {
  }

}
