export interface IFilterOption {
  id: string;
  value: string;
  customFilterFn?: (value: any) => boolean;
}
