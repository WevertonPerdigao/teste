// modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID, ErrorHandler} from '@angular/core';
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
import {AvatarModule} from 'ngx-avatar';


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
import {TipoprojetoService} from './services/tipoprojeto.service';
import {LoggedInGuard} from './login/loggedin.guard';
import {CargoService} from './services/cargo.service';
import {PerfilService} from './services/perfil.service';
import {ProjetoatividadeService} from './services/projetoatividade.service';
import {TipodispendioService} from './services/tipodispendio.service';
import {ToolbarService} from './services/toolbar.service';

// compoonents
import {HeaderComponent} from './header/header.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {FooterComponent} from './footer/footer.component';
import {MenuComponent} from './menus/menu/menu.component';
import {MenusComponent} from './menus/menus.component';
import {OrcamentoComponent} from './orcamento/orcamento.component';
import {RelatoriosComponent} from './relatorios/relatorios.component';
import {ProjetosComponent} from './projetos/projetos.component';
import {RangeSliderComponent} from './range-slider/range-slider.component';
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
import {SnackbarComponent} from './shared/messages/snackbar/snackbar.component';
import {ProjetoCreateComponent} from './projeto-create/projeto-create.component';
import {FuncionarioCreateComponent} from './funcionario-create/funcionario-create.component';
import {ApplicationErrorHandler} from './app.error-handler';
import {LocalStorageModule} from '@ngx-pwa/local-storage';
import {AtividadeCreateComponent} from './projeto-detail/projeto-atividades/atividade-create/atividade-create.component';
import {EscopoComponent} from './projeto-detail/informacoes-gerais-projeto/escopo/escopo.component';
import {JustificativaComponent} from './projeto-detail/informacoes-gerais-projeto/justificativa/justificativa.component';
import {DispendioCreateComponent} from './projeto-detail/orcamentos/dispendio-create/dispendio-create.component';
import {ListDispendiosComponent} from './projeto-detail/orcamentos/list-dispendios/list-dispendios.component';
import {DispendioStatusEditComponent} from './projeto-detail/orcamentos/dispendio-status-edit/dispendio-status-edit.component';
import {SidenavService} from './services/sidenav.service';
import {FuncionarioDetailComponent} from './funcionario-detail/funcionario-detail.component';
import {FuncionarioProvisaoService} from './services/funcionarioprovisao.service';
import {ProvisaoCreateComponent} from './funcionario-detail/provisao-create/provisao-create.component';
import {ProvisaoEditComponent} from './funcionario-detail/provisao-edit/provisao-edit.component';
import {YearPickerComponent} from './shared/custom-datepicker/year-picker/year-picker.component';
import {CustomDatepickerComponent} from './shared/custom-datepicker/custom-datepicker.component';
import {LoginLayoutComponent} from './layouts/login-layout.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import { ProjetoEditComponent } from './projeto-edit/projeto-edit.component';

@NgModule({
  declarations: [
    LoginLayoutComponent,
    AppComponent,
    NotFoundComponent,
    FooterComponent,
    MenuComponent,
    OrcamentoComponent,
    RelatoriosComponent,
    ProjetosComponent,
    MenusComponent,
    HeaderComponent,
    RangeSliderComponent,
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
    SnackbarComponent,
    ProjetoCreateComponent,
    FuncionarioCreateComponent,
    AtividadeCreateComponent,
    EscopoComponent,
    JustificativaComponent,
    DispendioCreateComponent,
    ListDispendiosComponent,
    DispendioStatusEditComponent,
    FuncionarioDetailComponent,
    ProvisaoCreateComponent,
    ProvisaoEditComponent,
    YearPickerComponent,
    CustomDatepickerComponent,
    ProjetoEditComponent,
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
    LocalStorageModule,
    CurrencyMaskModule,
    AvatarModule,
    ChartsModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
    MenuService,
    ProjetoService,
    SituacaoProjetoService,
    ProjetoDispendioService,
    FuncionarioService,
    LoginService,
    NotificationService,
    LoggedInGuard,
    TipoprojetoService,
    CargoService,
    FuncionarioProvisaoService,
    PerfilService,
    ProjetoatividadeService,
    TipodispendioService,
    SidenavService,
    ToolbarService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
