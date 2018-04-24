import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {LoginService} from '../services/login.service';
import {Observable} from 'rxjs/Observable';
import {MatSidenav} from '@angular/material';
import {SidenavService} from '../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  isLogin: boolean;
  name = '';
  @ViewChild('sidenav') public sideNav: MatSidenav;


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              public loginService: LoginService,
              private sidenavService: SidenavService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.isLogin = this.loginService.isLoggedIn();
    this.sidenavService.sideNav = this.sideNav;

  }

  getNameUser() {
    if (this.loginService.isLoggedIn()) {
      const nomes = this.loginService.getFuncionario().funcNome.split(' ');
      return nomes[0] + ' ' + nomes[nomes.length - 1];
    }
  }

  onLogout() {
    this.loginService.logout();
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
