import { User } from '../models';

export enum AppLookupActionType {
    ADD_USER = '[User] Add',
    REMOVE_USER = '[User] Remove',
}

/**
 * Action to add an user
 */
export class AddUser {
  static readonly type = AppLookupActionType.ADD_USER;

  constructor(public payload: User) {}
}

/**
 * Action to remove an user
 */
export class RemoveUser {
  static readonly type = AppLookupActionType.REMOVE_USER;

  constructor(public payload: User) {}
}

export type AppLookupActions =
    | AddUser
    | RemoveUser;
