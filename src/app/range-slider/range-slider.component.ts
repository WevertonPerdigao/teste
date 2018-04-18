import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit {

  @Input() maxParam = 0.0;
  @Input() minParam: number;

  @Input() valueParam: number;

  constructor() {
  }

  ngOnInit() {
  }
}
