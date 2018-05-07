// src/app/app-toolbar/app-toolbar.service.ts
import {ElementRef, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute, RoutesRecognized} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {MatToolbar} from '@angular/material';
import {Subject} from 'rxjs/Subject';

export class ToolbarItem {
  path: string;
  title: string;
  icon?: string;
  action?: string;
}


@Injectable()
export class ToolbarService {

  activeMenuItem$: Observable<ToolbarItem>;
  title: string;
  toolbar: ElementRef;
  renderer: Renderer2;


  constructor(private router: Router, private titleService: Title,
              private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer('', null);
    this.init();
  }

  init() {
    console.log('init');
    this.activeMenuItem$ = this.router.events
      .filter(e => e instanceof NavigationEnd)
      .map(_ => this.router.routerState.root)
      .map(route => {
        let active = this.lastRouteWithMenuItem(route.root);

        if (active && active.title) {
          this.removeValorToolbar();
          this.titleService.setTitle(this.title);
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
      ? {path: cfg.path, title: cfg.data.title, icon: cfg.data.icon}
      : undefined;
  }

  removeValorToolbar() {
    // if (this.toolbar.nativeElement.getElementsByTagName('buttonmenu')) {
    //   console.log('tem menu');
    //   this.renderer.removeChild(this.toolbar, this.toolbar.nativeElement.getElementsByTagName('buttonmenu'));
    //
    // } else {
    //   console.log('não  tem menu');
    // }

    if (this.toolbar.nativeElement.querySelector('h1')) {
      console.log('tem');
      this.renderer.removeChild(this.toolbar, this.toolbar.nativeElement.querySelector('h1'));
    }
  }

  setValorToolbar(descricao: string) {

    console.log('descricao =>' + descricao);
    // using remove child
    const li = this.renderer.createElement('h1');
    const text = this.renderer.createText(descricao);
    //this.renderer.setStyle(li, 'font-size', '24px');

    this.removeValorToolbar();

    this.renderer.appendChild(li, text);
    this.renderer.appendChild(this.toolbar.nativeElement, li);
  }

}
