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
import {DispendioCreateComponent} from './projeto-detail/orcamentos/dispendio-create/dispendio-create.component';
import {ListDispendiosComponent} from './projeto-detail/orcamentos/list-dispendios/list-dispendios.component';
import {DispendioStatusEditComponent} from './projeto-detail/orcamentos/dispendio-status-edit/dispendio-status-edit.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'projetos', pathMatch: 'full'},
  {path: 'projetos', component: ProjetosComponent, canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'login/:to', component: LoginComponent},
  {path: 'funcionarios', component: FuncionariosComponent},
  {path: 'funcionario-create', component: FuncionarioCreateComponent},
  {path: 'projeto-create', component: ProjetoCreateComponent},
  {path: 'projeto-detail', component: ProjetoDetailComponent},
  {path: 'atividade-create/:id', component: AtividadeCreateComponent},
  {path: 'dispendio-create/:id', component: DispendioCreateComponent},
  {path: 'list-dispendios', component: ListDispendiosComponent},
  {path: 'dispendio-status-edit', component: DispendioStatusEditComponent},
  {path: '**', component: NotFoundComponent}
];

