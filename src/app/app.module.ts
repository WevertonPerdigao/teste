import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menus/menu/menu.component';
import { MenusComponent } from './menus/menus.component';
import {ROUTES} from './app.routes';
import { TabComponent } from './tab/tab.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProjetoComponent } from './projetos/projeto/projeto.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    MenuComponent,
    SearchBarComponent,
    TabComponent,
    AtividadesComponent,
    OrcamentoComponent,
    CronogramaComponent,
    RelatoriosComponent,
    ProjetosComponent,
    UsuariosComponent,
    ProjetoComponent,
    SearchBarComponent,
    MenusComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }