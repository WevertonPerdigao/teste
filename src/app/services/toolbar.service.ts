// src/app/app-toolbar/app-toolbar.service.ts
import {Injectable} from '@angular/core';
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
}

@Injectable()
export class ToolbarService {
  toolbar: MatToolbar;

  // Make it possible to send an event about menu changed, so we can talk between components
  menuChanged = new Subject<any>();

  /* Keep track of which menu item is currently being active/selected */
  activeMenuItem$: Observable<ToolbarItem>;

  public activeToolbarItem: Observable<ToolbarItem>;
  title: string;

  constructor(private router: Router, private titleService: Title,
              private activatedRoute: ActivatedRoute,
              ) {


    this.activeMenuItem$ = this.router.events
      .filter(e => e instanceof NavigationEnd)
      .map(_ => this.router.routerState.root)
      .map(route => {
        const active = this.lastRouteWithMenuItem(route.root);

        if (active && active.title) {
          this.titleService.setTitle(active.title);
        }

        return active;
      });

    // console.log('ToolbarService');
    // this.activeToolbarItem$ = this.router.events
    //   .filter(e => e instanceof NavigationEnd)
    //   .map(_ => this.router.routerState.root)
    //   .map(route => {
    //     let active = this.lastRouteWithToolbarItem(route.root);
    //     console.log('active =>' + active + 'title' + active.title);


    //     return active;
    //   });
    this.activeToolbarItem = this.getItens();
  }

  getToolbarItems(): ToolbarItem[] {
    return this.router.config
      .filter(route => route.data && route.data.title) // only add a menu item for routes with a title set.
      .map(route => {
        return {
          path: route.path,
          title: route.data.title,
          icon: route.data.icon
        };
      });
  }


  getItens(): Observable<ToolbarItem> {

   // console.log('itens');
    // listen to page variable from router events
    return this.router
      .events
      .filter(event => event instanceof NavigationEnd)
      .map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            this.titleService.setTitle(child.snapshot.routeConfig.data['title']);

            return {

              path: child.snapshot.routeConfig.path,
              title: child.snapshot.routeConfig.data['title'],
              icon: child.snapshot.routeConfig.data.icon

            };
            // return child.snapshot.routeConfig && child.snapshot.routeConfig.data && child.snapshot.routeConfig.data['title']
            //   ? {
            //     path: child.snapshot.routeConfig.path,
            //     title: child.snapshot.routeConfig.data['title'],
            //     icon: child.snapshot.routeConfig.data.icon
            //   }
            //   : undefined;

          } else {
            this.titleService.setTitle(this.getTitle());
            return {
              path: child.snapshot.routeConfig.path,
              title: this.getTitle()
            };

          }
        }

        return null;
      });

  }

  getTitle() {
    return this.title;
  }

  setTitle(descricao: string) {
  //  console.log('descricao' + descricao);
    this.title = descricao;
  }

  fireMenuChanged() {
    this.menuChanged.next(null);
  }

  private lastRouteWithMenuItem(route: ActivatedRoute): ToolbarItem {
    let lastMenu;

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
}
