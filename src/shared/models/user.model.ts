import { IRegistration } from './registration.model';

export interface IUser extends IRegistration {
  id?: string,
  firstName: string,
  lastName: string,
  email: string,
}
