import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GPITBAM_API} from '../../app.api';


@Injectable()
export class MenuService {
  constructor(private http: HttpClient) {
  }

  listAllMenu() {
    return this.http.get(`${GPITBAM_API}/Menus`);
  }


  listMenuByUserId() {
    return this.http.get(`${GPITBAM_API}/Menus`);
  }

}


