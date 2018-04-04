import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatInputModule,
  MatGridListModule,
  MatSliderModule,
  MatDividerModule,
  MatDatepickerModule
} from '@angular/material';


@NgModule({
  imports: [CommonModule, LayoutModule],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDividerModule,
    MatSliderModule,
    MatDatepickerModule
  ]
})
export class MaterialModule {
}



