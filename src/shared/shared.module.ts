import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent, FooterComponent, HeaderComponent, SvgIconComponent, SearchbarComponent } from './components';
import { SpriteLoaderService, SvgService, TranslationLoaderService, SearchService } from './services';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    SvgIconComponent,
    SearchbarComponent,
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    SvgIconComponent,
    SearchbarComponent,
  ],
  providers: [
    SpriteLoaderService,
    {
      provide: 'SVG_SPRITE_PATH',
      useValue: './assets/sprite/svg-sprite.svg',
    },
    TranslationLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: (translationLoader: TranslationLoaderService) => () => translationLoader.loadTranslation(),
      deps: [TranslationLoaderService],
      multi: true,
    },
    SearchService,
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
