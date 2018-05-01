import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {LoginService} from '../services/login.service';
import {Observable} from 'rxjs/Observable';
import {MatSidenav, MatToolbar} from '@angular/material';
import {SidenavService} from '../services/sidenav.service';
import {ToolbarService, ToolbarItem} from '../services/toolbar.service';
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
  nomeUser;
  @ViewChild('sidenav') public sideNav: MatSidenav;
  @ViewChild('toolbar') public toolbar: MatToolbar;
  appName = 'SGP';
  toolbarItem: Observable<ToolbarItem>;
  activeMenuItem$: Observable<ToolbarItem>;


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              public loginService: LoginService,
              private sidenavService: SidenavService,
              private toolbarService: ToolbarService,
              private router: Router,
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.updateMenu();

    this.toolbarService.menuChanged.subscribe((any) => {
      this.updateMenu();
    });

  }

  private updateMenu() {
    this.activeMenuItem$ = this.toolbarService.activeMenuItem$;
  }

  ngOnInit() {

    // passa por referência a sidenav da view para maniupulação (open ou close)
    this.sidenavService.sideNav = this.sideNav;
    this.toolbarService.toolbar = this.toolbar;

    // get usuário logado no sistema
    if (this.loginService.isLoggedIn()) {
      const nomes = this.loginService.getFuncionario().funcNome.split(' ');
      this.nomeUser = nomes[0] + ' ' + nomes[nomes.length - 1];
    }

  }

  onLogout() {
    console.log('logout');
    this.loginService.logout();
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit(): void {


  }


}
