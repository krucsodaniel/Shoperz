import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent, FooterComponent, HeaderComponent, SvgIconComponent } from './components';
import { SpriteLoaderService, SvgService } from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    SvgIconComponent,
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    SvgIconComponent,
  ],
  providers: [
    SpriteLoaderService,
    {
      provide: 'SVG_SPRITE_PATH',
      useValue: './assets/sprite/svg-sprite.svg',
    },
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [SvgService],
    };
  }
}
