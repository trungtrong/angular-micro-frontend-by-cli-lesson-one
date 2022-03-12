import {environment} from '@environment';

export const API_URL = !!environment.moduleFederationUrl.app1 ? `${environment.moduleFederationUrl.app1}` : `${window.location.origin}`;

export const API_ENDPOINT = {
    //
    // Base
    Auth: 'api/authentication',
};
