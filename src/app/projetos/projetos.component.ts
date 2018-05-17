import {Component, OnInit} from '@angular/core';
import {ProjetoService} from '../services/projeto.service';
import {Projeto} from '../models/projeto.model';
import {LoginService} from '../services/login.service';
import {Utils} from '../utils/utils';
import {NavigationExtras, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ToolbarService} from '../services/toolbar.service';
import {NotificationService} from '../services/notification.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})

export class ProjetosComponent implements OnInit {

  public projetos: Projeto[];
  skipLocationChange?: boolean;
  searchForm: FormGroup;
  searchControl: FormControl;
  paramsSubscription: Subscription;
  dataSearch = '';

  constructor(private projetoService: ProjetoService,
              private loginService: LoginService,
              private router: Router,
              private toolbarService: ToolbarService,
              private fb: FormBuilder,
              private _location: Location,
              private nf: NotificationService) {
  }

  ngOnInit() {
    this.searchProjetos();

    this.toolbarService.dataSearch$.subscribe((data) => {
      this.dataSearch = data; // And he have data here too!
      this.searchProjetos();
    });


    const userid = +this.loginService.myStorage.getItem('currentUser');
    // this.searchByProjName();
  }


  searchByProjName() {
    this.searchControl = this.fb.control(this.dataSearch);
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });
  }

  searchProjetos() {
    this.projetoService.listProjetosByUserIdAndNome(this.dataSearch)
      .subscribe(projetos => this.projetos = projetos);
  }

  redirectCreateProjeto() {
    this.router.navigate(['/projeto-create'], {skipLocationChange: true});
  }

  goToProjectDetail(projeto: Projeto) {
    this.router.navigate(['/projeto-detail'],
      {queryParams: {id: projeto.projId}, skipLocationChange: true});


  }
}
