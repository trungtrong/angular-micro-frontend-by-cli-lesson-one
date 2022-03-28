
import {Select, Selector } from '@ngxs/store';
import { cloneDeep } from 'lodash-es';
//
import {UserState, IUserState} from './app-lookup.state';
import { User } from '../models';

export class AppLookupSelectors {
    @Selector([UserState])
    public static getUsers(state: IUserState): User[] {
        return cloneDeep(state.users);
    }
}
