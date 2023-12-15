import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyListComponent {
  @Input()
  emptyListName: string;

  @HostBinding('class')
  private readonly classes = 'mx-auto';

  buildTranslationKey(link: string, relativeKey: string): string {
    return `emptyList.${ link }.${ relativeKey }`;
  }
}
