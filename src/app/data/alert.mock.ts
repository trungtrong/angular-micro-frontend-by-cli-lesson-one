import * as faker from 'faker';
//
import { AlertModel } from '@app/models/shared';

export function randomAlerts(): AlertModel[] {
    return Array(1).fill({}).map((item) => new AlertModel({
        id: 1,
        content: 'Coronavirus Advisories & Face-covering Requirements' + '',
        linkedTo: '/travel-alerts',
        status: true,
    }));
}
