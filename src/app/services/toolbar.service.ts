// src/app/app-toolbar/app-toolbar.service.ts
import {Injectable} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute, RoutesRecognized} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

export class MenuItem {
  path: string;
  title: string;
  icon?: string;
}

@Injectable()
export class ToolbarService {
  activeMenuItem: MenuItem;
  title = '';

  constructor(private router: Router, private titleService: Title,
              private activatedRoute: ActivatedRoute) {
    // listen to page variable from router events
    this.router
      .events
      .filter(event => event instanceof NavigationEnd)
      .map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {

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

            return null;

          }
        }

        return null;

      }).subscribe(data => {
      if (data) {
        this.activeMenuItem = data;
        this.titleService.setTitle(data.title);
      } else {
        this.activeMenuItem = undefined;
        this.titleService.setTitle(undefined);
      }
    });


    // console.log('ToolbarService');
    // this.activeMenuItem$ = this.router.events
    //   .filter(e => e instanceof NavigationEnd)
    //   .map(_ => this.router.routerState.root)
    //   .map(route => {
    //     let active = this.lastRouteWithMenuItem(route.root);
    //     console.log('active =>' + active + 'title' + active.title);


    //     return active;
    //   });
  }

  getMenuItems(): MenuItem[] {
    return this.router.config
      .filter(route => route.data && route.data.title) //only add a menu item for routes with a title set.
      .map(route => {
        return {
          path: route.path,
          title: route.data.title,
          icon: route.data.icon
        };
      });
  }

  private lastRouteWithMenuItem(route: ActivatedRoute): MenuItem {
    let lastMenu = undefined;
    do {
      lastMenu = this.extractMenu(route) || lastMenu;
    }
    while ((route = route.firstChild));
    return lastMenu;
  }

  private extractMenu(route: ActivatedRoute): MenuItem {
    let cfg = route.routeConfig;
    console.log('cfg =>' + cfg);
    return cfg && cfg.data && cfg.data['title']
      ? {path: cfg.path, title: cfg.data.title, icon: cfg.data.icon}
      : undefined;
  }
}
