import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProjetosComponent} from './projetos/projetos.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {ProjetoDetailComponent} from './projeto-detail/projeto-detail.component';


export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'projetos', component: ProjetosComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'projeto-detail', component: ProjetoDetailComponent},
  {path: '**', component: NotFoundComponent}
];
