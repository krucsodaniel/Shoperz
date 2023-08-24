import { IFilterOption } from './index';

export interface IFilterDefinition<Type = any> {
  id: string;
  propertySelector: (item: Type) => any;
  label?: string;
  options: IFilterOption[],
  multiselect?: boolean;
  selectedOption?: IFilterOption;
}
