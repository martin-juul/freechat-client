import { User } from './user.model';
import { Action } from './action.model';

export interface Message {
  from?: User;
  content?: any;
  action?: Action;
}
