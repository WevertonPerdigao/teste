import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GPITBAM_API} from '../../app.api';
import {Observable} from 'rxjs/Observable';

import {Menu} from './menu.model';


@Injectable()
export class MenuService {
  constructor(private http: HttpClient) {
  }

  listAllMenu() {
    return this.http.get(`${GPITBAM_API}/menus`);
  }


  listMenuByUserId(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${GPITBAM_API}/menus`);
  }

}


