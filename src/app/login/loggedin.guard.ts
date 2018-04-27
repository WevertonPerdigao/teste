import {CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {LoginService} from '../services/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  checkAuthentication(path: string): boolean {
    const loggedIn = this.loginService.isLoggedIn();
    if (!loggedIn) {
      this.loginService.handleLogin(`/${path}`);
    } else if (!path) {
//      console.log('aqui ');
    }
    return loggedIn;
  }

  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
    return this.checkAuthentication(activatedRoute.routeConfig.path);
  }


}
