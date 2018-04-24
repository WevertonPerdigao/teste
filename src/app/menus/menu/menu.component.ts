import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Menu} from './menu.model';
import {SidenavService} from '../../services/sidenav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() menu: Menu;

  constructor(private sidenavService: SidenavService) {
  }

  ngOnInit() {
  }

  navClose() {
    this.sidenavService.sideNav.close();
  }

}
