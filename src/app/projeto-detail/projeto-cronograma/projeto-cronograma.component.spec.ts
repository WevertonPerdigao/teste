import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetoCronogramaComponent } from './projeto-cronograma.component';

describe('ProjetoCronogramaComponent', () => {
  let component: ProjetoCronogramaComponent;
  let fixture: ComponentFixture<ProjetoCronogramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetoCronogramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoCronogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
