import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProjetosComponent} from './projetos/projetos.component';
import {ProjetoDetailComponent} from './projeto-detail/projeto-detail.component';
import {LoggedInGuard} from './login/loggedin.guard';
import {FuncionariosComponent} from './funcionarios/funcionarios.component';
import {LoginComponent} from './login/login.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent,}, //canActivate: [LoggedInGuard]
  {path: 'login', component: LoginComponent},
  {path: 'login/:to', component: LoginComponent},
  {path: 'projetos', component: ProjetosComponent},
  {path: 'funcionarios', component: FuncionariosComponent},
  {path: 'projeto-detail/:id', component: ProjetoDetailComponent},
  {path: '**', component: NotFoundComponent}
];

