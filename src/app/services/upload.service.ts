import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {GPITBAM_API} from '../app.api';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {
  }

  uploadTermo(data: FormData, codigo: number): Observable<any> {

    const params = new HttpParams().set('codigo', codigo.toString());

    const request = new HttpRequest('POST', `${GPITBAM_API}/projetos/uploadtermo`, data, {
      params: params,
      reportProgress: true,
    });

    return this.http.request<any>(request);
  }
}
