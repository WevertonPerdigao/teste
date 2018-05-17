///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {LoginService} from '../services/login.service';
import {MatButton, MatInput, MatSidenav} from '@angular/material';
import {SidenavService} from '../services/sidenav.service';
import {ToolbarService} from '../services/toolbar.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnDestroy, OnInit {

  mobileQuery: MediaQueryList;
  nomeUser;
  boSearch;
  boUpdate;
  boCreate;
  @ViewChild('sidenav') public sideNav: MatSidenav;
  @ViewChild('mattoolbar', {read: ElementRef}) toolbar: ElementRef;
  @ViewChild('chipInput') chipInput: MatButton;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              public loginService: LoginService,
              private sidenavService: SidenavService,
              private toolbarService: ToolbarService,
              private router: Router,
              private route: ActivatedRoute,
              private titleService: Title,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.subscribeNavigationEnd();
  }

  backClicked() {
    this.router.navigate([this.toolbarService.routeBack], this.toolbarService.navExtras);
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

  search(valor: string) {
    this.toolbarService.updateDataSearch(valor);
  }

  actionUpdate() {
    this.toolbarService.actionUpdate();
  }

  onLogout() {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  subscribeNavigationEnd() {
    this.router
      .events
      .filter(e => e instanceof NavigationEnd)
      .map(() => this.route)
      .map(route => {
        if (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(rota => {
        this.toolbarService.toolbar = this.toolbar;

        if (rota.title) {
          this.titleService.setTitle(rota.title);

          if (this.toolbar.nativeElement.querySelector('#sp-toolbar-title')) {
            this.toolbar.nativeElement.querySelector('#sp-toolbar-title').textContent = rota.title;
          }
        }
        rota.update ? this.boUpdate = rota.update : this.boUpdate = false;
        rota.create ? this.boCreate = rota.create : this.boCreate = false;
        rota.main ? this.boSearch = rota.main : this.boSearch = false;
      });
  }


}
