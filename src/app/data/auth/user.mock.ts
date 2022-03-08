import * as faker from 'faker';
import {UserModel, AccessTokenResponse} from './../../models/shared';

export function generateAccessToken(): string {
    // create token that expired in 15 minutes
    const tokenPayload = {
        exp: Math.round(new Date(Date.now() + 60 * 60 * 1000).getTime() / 1000)
    };

    return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(tokenPayload))}.zQVTwht1ogTNSl7fUH7_mxMJCFDVcZq4s2N2yu0vH9M`;
}

export function generateRefreshToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEiLCJuYmYiOjE1OTUyNjQ0MDAsImV4' +
        'cCI6MTU5NTI2NDQwMCwiaWF0IjoxNTk1MjY0NDAwfQ.Ou8bE7Ua_tRuz4Fz1SdPfb_Lfy-L9qpzbrA3idLC1AY';
}

export function randomLoggedUser(): UserModel {
    const fullName = faker.name.findName();
    const nameArray = fullName.split(' ');
    const firstKey = nameArray[0][0];
    const length = nameArray.length;
    const lastKey = nameArray[length - 1][0];

    return new UserModel({
        id: faker.random.number(),
        fullName: 'Trong Ngo',
        firstName: 'Trong',
        lastName: 'Ngo',
        nameAvatar: 'TN',
        accessToken: generateAccessToken(),
        refreshToken: generateRefreshToken()
    });
}

export function randomRefreshToken(): AccessTokenResponse {
    return new AccessTokenResponse({
        accessToken: generateAccessToken(),
        refreshToken: generateRefreshToken()
    });
}

export function randomUserName(): string {
    return faker.name.findName();
}
