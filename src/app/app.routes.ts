import {Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProjetosComponent} from './projetos/projetos.component';
import {ProjetoDetailComponent} from './projeto-detail/projeto-detail.component';
import {LoggedInGuard} from './login/loggedin.guard';
import {FuncionariosComponent} from './funcionarios/funcionarios.component';
import {LoginComponent} from './login/login.component';
import {ProjetoCreateComponent} from './projeto-create/projeto-create.component';
import {FuncionarioCreateComponent} from './funcionario-create/funcionario-create.component';
import {ProjetoAtividadesComponent} from './projeto-detail/projeto-atividades/projeto-atividades.component';
import {AtividadeCreateComponent} from './projeto-detail/projeto-atividades/atividade-create/atividade-create.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'projetos', pathMatch: 'full'}, // canActivate: [LoggedInGuard]
  {path: 'projetos', component: ProjetosComponent},// , canActivate: [LoggedInGuard]
  {path: 'login', component: LoginComponent},
  {path: 'login/:to', component: LoginComponent},
  {path: 'funcionarios', component: FuncionariosComponent},
  {path: 'funcionario-create', component: FuncionarioCreateComponent},
  {path: 'projeto-create', component: ProjetoCreateComponent},
  {path: 'projeto-detail/:id', component: ProjetoDetailComponent},
  {path: 'atividade-create/:id', component: AtividadeCreateComponent},
  {path: '**', component: NotFoundComponent}
];

