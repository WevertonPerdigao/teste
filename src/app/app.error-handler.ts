import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/observable/throw';

import {NotificationService} from './services/notification.service';
import {LoginService} from './services/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService,
              private injector: Injector,
              private zone: NgZone) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 400:
            this.ns.notify('Erro ao processar a sua solicitação.');
            break;
          case 401:
            this.injector.get(LoginService).handleLogin();
            break;
          case 403:
            this.ns.notify('Não autorizado ');
            break;
          case 503:
            this.ns.notify('Serviço indisponível ');
            break;
          case 404:
            this.ns.notify('Recurso não encontrado.');
            break;
          default:
            this.ns.notify('Recurso não encontrado. Verifique o console para mais detalhes');
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }
}
