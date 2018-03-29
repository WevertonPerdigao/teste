import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProjetosComponent} from './projetos/projetos.component';
import {ProjetoDetailComponent} from './projeto-detail/projeto-detail.component';
import {AuthGuard} from './services/authguard';
import {FuncionariosComponent} from './funcionarios/funcionarios.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'projetos', component: ProjetosComponent},
  {path: 'funcionarios', component: FuncionariosComponent},
  {path: 'projeto-detail/:id', component: ProjetoDetailComponent},
  {path: '**', component: NotFoundComponent}
];
