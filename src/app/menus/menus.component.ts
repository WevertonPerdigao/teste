import { Component, OnInit } from '@angular/core';
import {MenuService} from './menu/menu.service';
import {Menu} from './menu/menu.model';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  constructor(private menuService: MenuService) { }

  ngOnInit() {
  }

}
