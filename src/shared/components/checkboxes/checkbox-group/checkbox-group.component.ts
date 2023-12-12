import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  QueryList,
} from '@angular/core';
import { IFilterDefinition, IFilterOption } from '../../../models';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent {
  previouslySelected: CheckboxComponent;

  @HostBinding('class.bg-white')
  @Input()
  multiselect: boolean;

  @Input()
  definition: IFilterDefinition;

  @ContentChildren(CheckboxComponent)
  checkboxes: QueryList<CheckboxComponent>;

  @HostBinding('class')
  private readonly classes = 'flex flex-col gap-3 p-3 border rounded bg-grey-400';

  checkboxChanged(option: IFilterOption) {
    this.previouslySelected = this.checkboxes.find((checkbox: CheckboxComponent) => checkbox.value);

    const currentlySelected = this.checkboxes.find((checkbox: CheckboxComponent) => checkbox.option.id === option.id);

    if (!this.multiselect) {
      this.checkboxes.forEach((checkbox: CheckboxComponent) => {
        if (checkbox.option.id !== currentlySelected.option.id) {
          checkbox.writeValue(false);
        }
      });
    }
  }
}
