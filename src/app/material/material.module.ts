import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import {MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
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
  MatDatepickerModule,
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_DATE_LOCALE_PROVIDER
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
    MatDatepickerModule,

  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}]
})
export class MaterialModule {
}



