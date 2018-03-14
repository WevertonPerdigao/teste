import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  pesquisar(campoPesquisa: string ): void {
    console.log('valor campo' + campoPesquisa);
  }

}
