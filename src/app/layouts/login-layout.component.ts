import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-layout',
  template: `
    <router-outlet></router-outlet>
    <app-snackbar></app-snackbar>
  `,
  styles: []
})
export class LoginLayoutComponent {
}
