import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    public color: string = 'red';

    constructor() {
        console.log('hello');
    }
}
