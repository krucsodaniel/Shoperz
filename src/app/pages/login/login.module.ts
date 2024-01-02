import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, LoginPanelComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    LoginPanelComponent,
  ],
})
export class LoginModule {}
