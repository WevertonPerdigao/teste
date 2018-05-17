// src/app/app-toolbar/app-toolbar.service.ts
import {ElementRef, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute, RoutesRecognized, Params, NavigationExtras} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';

export class ToolbarItem {
  path: string;
  title: string;
  icon?: string;
  action?: string;
  main?: boolean;
}

@Injectable()
export class ToolbarService {
  toolbar: ElementRef;
  renderer: Renderer2;
  navExtras: NavigationExtras;
  routeBack;


  dataSearch$: Observable<any>;
  private dataSearchSubject = new Subject<any>();
  private actionSubject = new Subject<any>();
  action$: Observable<any>;

  constructor(private router: Router, private titleService: Title,
              private rendererFactory: RendererFactory2) {

    this.renderer = this.rendererFactory.createRenderer('', null);

// referencia observable a ser utilizado pelo subject

    this.dataSearch$ = this.dataSearchSubject.asObservable();

    this.action$ = this.actionSubject.asObservable();
  }

  /*
  atualiza dados sobrescritos do construtor
   */
  updateDataSearch(data) {
    this.dataSearchSubject.next(data);
  }

  /*
 /* executa método sobrescrito
  */
  actionUpdate() {
    this.actionSubject.next();
  }


  setValuesToolbar(): Observable<ToolbarItem> {
    return this.router.events
      .filter(e => e instanceof NavigationEnd)
      .map(_ => this.router.routerState.root)
      .map(route => {
        let active = this.lastRouteWithMenuItem(route.root);
        if (active && active.title) {
          this.setValorToolbar(active.title);
          this.titleService.setTitle(active.title);
        }
        return active;
      });
  }

  private lastRouteWithMenuItem(route: ActivatedRoute): ToolbarItem {
    let lastMenu = undefined;
    do {
      lastMenu = this.extractMenu(route) || lastMenu;
    }
    while ((route = route.firstChild));
    return lastMenu;
  }

  private extractMenu(route: ActivatedRoute): ToolbarItem {
    const cfg = route.routeConfig;

    return cfg && cfg.data && cfg.data.title
      ? {path: cfg.path, title: cfg.data.title, icon: cfg.data.icon, main: cfg.data.main}
      : undefined;
  }

  setValorToolbar(descricao: string) {
    if (this.toolbar.nativeElement.querySelector('#sp-toolbar-title')) {
      this.toolbar.nativeElement.querySelector('#sp-toolbar-title').textContent = descricao;
    }

    this.titleService.setTitle(descricao);
  }

  setRouteBack(route: String, navExtras?: NavigationExtras) {
    this.routeBack = route;
    this.navExtras = navExtras;
  }

}
