// modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts/ng2-charts';

import ptBr from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(ptBr);
import {ROUTES} from './app.routes';
// services
import {ProjetoService} from './services/projeto.service';
import {SituacaoProjetoService} from './services/situacaoprojeto.service';
import {MenuService} from './menus/menu/menu.service';
import {ProjetoDispendioService} from './services/projetodispendio.service';
import {LoginService} from './services/login.service';
import {FuncionarioService} from './services/funcionario.service';
import {NotificationService} from './services/notification.service';
import {LoggedInGuard} from './login/loggedin.guard';

import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {FooterComponent} from './footer/footer.component';
import {MenuComponent} from './menus/menu/menu.component';
import {MenusComponent} from './menus/menus.component';
import {AtividadesComponent} from './atividades/atividades.component';
import {OrcamentoComponent} from './orcamento/orcamento.component';
import {CronogramaComponent} from './cronograma/cronograma.component';
import {RelatoriosComponent} from './relatorios/relatorios.component';
import {ProjetosComponent} from './projetos/projetos.component';
import {ProjetoComponent} from './projetos/projeto/projeto.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {RangeSliderComponent} from './range-slider/range-slider.component';
import {ProjetoDispendioComponent} from './projeto-dispendio/projeto-dispendio.component';
import {ProjetoDetailComponent} from './projeto-detail/projeto-detail.component';
import {ProjetoCronogramaComponent} from './projeto-detail/informacoes-gerais-projeto/projeto-cronograma/projeto-cronograma.component';
import {ProjetoOrcamentoComponent} from './projeto-detail/informacoes-gerais-projeto/projeto-orcamento/projeto-orcamento.component';
import {ProjetoEquipeComponent} from './projeto-detail/informacoes-gerais-projeto/projeto-equipe/projeto-equipe.component';
import {ProjetoAtividadesComponent} from './projeto-detail/projeto-atividades/projeto-atividades.component';
import {ProjetoRelatoriosComponent} from './projeto-detail/projeto-relatorios/projeto-relatorios.component';
import {DoughnutChartComponent} from './doughnut-chart/doughnut-chart.component';
import {ProjetoContatosComponent} from './projeto-detail/informacoes-gerais-projeto/projeto-contatos/projeto-contatos.component';
import {OrcamentoSliderComponent} from './projeto-detail/orcamentos/orcamento-slider/orcamento-slider.component';
import {ResumoDispendiosComponent} from './projeto-detail/orcamentos/resumo-dispendios/resumo-dispendios.component';
import {SolicitacoesComponent} from './projeto-detail/orcamentos/solicitacoes/solicitacoes.component';
import {LoginComponent} from './login/login.component';
import {FuncionariosComponent} from './funcionarios/funcionarios.component';
import {FuncionarioComponent} from './funcionarios/funcionario/funcionario.component';
import {SnackbarComponent} from './shared/messages/snackbar/snackbar.component';
import { ProjetoCreateComponent } from './projeto-create/projeto-create.component';



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
    ProjetoComponent,
    SearchBarComponent,
    MenusComponent,
    HeaderComponent,
    RangeSliderComponent,
    ProjetoDispendioComponent,
    ProjetoDetailComponent,
    ProjetoCronogramaComponent,
    ProjetoOrcamentoComponent,
    ProjetoEquipeComponent,
    ProjetoAtividadesComponent,
    ProjetoRelatoriosComponent,
    DoughnutChartComponent,
    ProjetoContatosComponent,
    OrcamentoSliderComponent,
    ResumoDispendiosComponent,
    SolicitacoesComponent,
    LoginComponent,
    FuncionariosComponent,
    FuncionarioComponent,
    SnackbarComponent,
    ProjetoCreateComponent,
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
    ChartsModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'},
       MenuService,
    ProjetoService,
    SituacaoProjetoService,
    ProjetoDispendioService,
    FuncionarioService,
    LoginService,
    NotificationService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
