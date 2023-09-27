import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './components';
import { SharedModule } from 'src/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { SvgIconsModule } from '../../../core';

const routes: Routes = [
  { path: '', component: AboutUsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild(routes),
    SvgIconsModule,
  ],
})
export class AboutUsModule {}
