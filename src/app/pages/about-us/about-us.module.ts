import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AboutUsComponent, FeedbackFormComponent, RatingComponent} from './components';
import { SvgIconsModule } from '@core-module';
import { SharedModule } from 'src/shared/shared.module';

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
    ReactiveFormsModule,
  ],
  declarations: [
    AboutUsComponent,
    FeedbackFormComponent,
    RatingComponent,
  ],
})
export class AboutUsModule {}
