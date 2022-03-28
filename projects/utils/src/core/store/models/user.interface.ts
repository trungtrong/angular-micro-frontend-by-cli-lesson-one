export class User {
    name: string;
    email: string;

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
