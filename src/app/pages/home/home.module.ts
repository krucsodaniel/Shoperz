import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent, SliderComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { SvgIconsModule } from '@core-module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SvgIconsModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [
    SliderComponent,
    HomeComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    SliderComponent,
  ],
})
export class HomeModule {}
