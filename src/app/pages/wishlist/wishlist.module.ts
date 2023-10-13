import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from './component';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistItemComponent } from './component/wishlist-item/wishlist-item.component';
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
    WishlistItemComponent
  ],
})
export class WishlistModule { }
