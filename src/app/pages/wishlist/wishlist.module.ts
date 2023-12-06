import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from './components';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistCardComponent } from './components';
import { SvgIconsModule } from '@core-module';

const routes: Routes = [
  { path: '', component: WishlistComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule,
    SvgIconsModule,
  ],
  declarations: [
    WishlistComponent,
    WishlistCardComponent,
  ],
})
export class WishlistModule {}
