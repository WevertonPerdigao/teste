import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatToolbarModule,
  MatIconModule, MatButtonModule, MatMenuModule, MatCardModule, MatSidenavModule, MatListModule, MatTabsModule, MatInputModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  imports: [CommonModule, LayoutModule],
  exports: [
    MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatCardModule, MatSidenavModule, MatListModule, MatTabsModule, MatInputModule
  ]
})
export class MaterialModule {
}



