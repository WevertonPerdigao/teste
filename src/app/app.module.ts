import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';

import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {FooterComponent} from './footer/footer.component';
import {MenuComponent} from './menus/menu/menu.component';
import {MenusComponent} from './menus/menus.component';
import {ROUTES} from './app.routes';
import {AtividadesComponent} from './atividades/atividades.component';
import {OrcamentoComponent} from './orcamento/orcamento.component';
import {CronogramaComponent} from './cronograma/cronograma.component';
import {RelatoriosComponent} from './relatorios/relatorios.component';
import {ProjetosComponent} from './projetos/projetos.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProjetoComponent} from './projetos/projeto/projeto.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {UsuarioComponent} from './usuarios/usuario/usuario.component';
import {MenuService} from './menus/menu/menu.service';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './header/header.component';
import {UsuarioService} from './usuarios/usuario/usuario.service';
import {ProjetoService} from './projetos/projeto/projeto.service';
import {SituacaoComponent} from './situacao/situacao.component';
import {SituacaoService} from './situacao/situacao.service';
import ptBr from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {RangeSliderComponent} from './range-slider/range-slider.component';
import {ProjetoDispendioComponent} from './projeto-dispendio/projeto-dispendio.component';
import {VwprojetovalorService} from './projeto-valor/vwprojetovalor.service';
import {ProjetoDetailComponent} from './projeto-detail/projeto-detail.component';
import {ProjetoCronogramaComponent} from './projeto-detail/projeto-cronograma/projeto-cronograma.component';
import {ProjetoOrcamentoComponent} from './projeto-detail/projeto-orcamento/projeto-orcamento.component';
import {ProjetoEquipeComponent} from './projeto-detail/projeto-equipe/projeto-equipe.component';
import {ProjetoAtividadesComponent} from './projeto-detail/projeto-atividades/projeto-atividades.component';
import {ProjetoRelatoriosComponent} from './projeto-detail/projeto-relatorios/projeto-relatorios.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    MenuComponent,
    SearchBarComponent,
    AtividadesComponent,
    OrcamentoComponent,
    CronogramaComponent,
    RelatoriosComponent,
    ProjetosComponent,
    UsuariosComponent,
    ProjetoComponent,
    SearchBarComponent,
    MenusComponent,
    UsuarioComponent,
    HeaderComponent,
    SituacaoComponent,
    RangeSliderComponent,
    ProjetoDispendioComponent,
    ProjetoDetailComponent,
    ProjetoCronogramaComponent,
    ProjetoOrcamentoComponent,
    ProjetoEquipeComponent,
    ProjetoAtividadesComponent,
    ProjetoRelatoriosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'},
    MenuService,
    ProjetoService,
    UsuarioService,
    SituacaoService,
    VwprojetovalorService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
