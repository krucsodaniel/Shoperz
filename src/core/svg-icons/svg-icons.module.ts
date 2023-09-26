import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SpriteLoaderService, SvgService } from './services';
import { SvgIconComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [SvgIconComponent],
  providers: [
    SpriteLoaderService,
    {
      provide: 'SVG_SPRITE_PATH',
      useValue: './assets/sprite/svg-sprite.svg',
    },
  ],
  exports: [SvgIconComponent],
})
export class SvgIconsModule {
  static forRoot(): ModuleWithProviders<SvgIconsModule> {
    return {
      ngModule: SvgIconsModule,
      providers: [SvgService],
    };
  }
}
