import {Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProjetosComponent} from './projetos/projetos.component';
import {ProjetoDetailComponent} from './projeto-detail/projeto-detail.component';
import {LoggedInGuard} from './login/loggedin.guard';
import {FuncionariosComponent} from './funcionarios/funcionarios.component';
import {LoginComponent} from './login/login.component';
import {ProjetoCreateComponent} from './projeto-create/projeto-create.component';
import {FuncionarioCreateComponent} from './funcionario-create/funcionario-create.component';
import {AtividadeCreateComponent} from './projeto-detail/projeto-atividades/atividade-create/atividade-create.component';
import {DispendioCreateComponent} from './projeto-detail/orcamentos/dispendio-create/dispendio-create.component';
import {ListDispendiosComponent} from './projeto-detail/orcamentos/list-dispendios/list-dispendios.component';
import {DispendioStatusEditComponent} from './projeto-detail/orcamentos/dispendio-status-edit/dispendio-status-edit.component';
import {FuncionarioDetailComponent} from './funcionario-detail/funcionario-detail.component';
import {ProvisaoCreateComponent} from './funcionario-detail/provisao-create/provisao-create.component';
import {ProvisaoEditComponent} from './funcionario-detail/provisao-edit/provisao-edit.component';
import {LoginLayoutComponent} from './layouts/login-layout.component';
import {HeaderComponent} from './header/header.component';

export const ROUTES: Routes = [
  // {path: '', redirectTo: 'projetos', pathMatch: 'full'},
  // {path: 'projetos', component: ProjetosComponent, canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
  // {path: 'login', component: LoginComponent},
  // {path: 'login/:to', component: LoginComponent},
  {
    path: '',
    component: HeaderComponent,
    canActivate: [LoggedInGuard],
    canLoad: [LoggedInGuard],
    children: [
      {
        path: 'projetos',
        component: ProjetosComponent,
        data: {
          title: 'Projetos'
        }
      },
      {
        path: 'funcionarios', component: FuncionariosComponent, data: {
          title: 'Usuários'
        }
      },
      {
        path: 'funcionario-create', component: FuncionarioCreateComponent,
        data: {
          title: 'Novo Usuário'
        }
      },
      {path: 'funcionario-detail', component: FuncionarioDetailComponent,
       },
      {path: 'provisao-create', component: ProvisaoCreateComponent},
      {path: 'provisao-edit', component: ProvisaoEditComponent},
      {
        path: 'projeto-create', component: ProjetoCreateComponent,
        data: {
          title: 'Novo Projeto'
        }
      },
      {path: 'projeto-detail', component: ProjetoDetailComponent},
      {
        path: 'atividade-create/:id', component: AtividadeCreateComponent,
        data: {
          title: 'Nova Atividade'
        }
      },
      {
        path: 'dispendio-create/:id', component: DispendioCreateComponent,
        data: {
          title: 'Novo Dispêndio'
        }
      },
      {path: 'list-dispendios', component: ListDispendiosComponent},
      {path: 'dispendio-status-edit', component: DispendioStatusEditComponent},
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login/:to',
        component: LoginComponent
      }
    ]
  },
  {path: '**', component: NotFoundComponent},
];

