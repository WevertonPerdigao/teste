import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {LoginService} from '../services/login.service';
import {Observable} from 'rxjs/Observable';
import {MatSidenav} from '@angular/material';
import {SidenavService} from '../services/sidenav.service';
import {ToolbarService, MenuItem} from '../services/toolbar.service';
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {filter} from 'rxjs/operators';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnDestroy, OnInit, AfterViewInit {
  mobileQuery: MediaQueryList;
  isLogin: boolean;
  name = '';
  @ViewChild('sidenav') public sideNav: MatSidenav;
  appName = 'Ride Finder';
  mainMenuItems;
  activeMenuItem: MenuItem;


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              public loginService: LoginService,
              private sidenavService: SidenavService,
              private toolbarService: ToolbarService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    console.log('construtor header');


  }

  ngOnInit() {

    this.router.events
      .filter(event => event instanceof RoutesRecognized)
      .map((event: RoutesRecognized) => {

        return event.state.root.firstChild.data['title'];
      })
      .subscribe(customData => {
        console.log(customData);
      });

    console.log('init header');
    // passa por referência a sidenav da view para maniupulação (open ou close)
    this.sidenavService.sideNav = this.sideNav;
    this.mainMenuItems = this.toolbarService.getMenuItems();
    this.activeMenuItem = this.toolbarService.activeMenuItem;

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

  ngAfterViewInit(): void {
    console.log('after header');
  }


}
