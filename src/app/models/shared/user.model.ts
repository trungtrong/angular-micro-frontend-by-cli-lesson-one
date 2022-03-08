export class UserModel {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    avatarImg: string;
    accessToken: string;
    refreshToken: string;

    // UI only
    nameAvatar: string;

    constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);
    }
}

export class AccessTokenResponse {
    accessToken: string;
    refreshToken: string;

    constructor(init?: Partial<AccessTokenResponse>) {
        Object.assign(this, init);
    }
}
