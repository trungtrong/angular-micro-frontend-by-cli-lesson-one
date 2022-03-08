export class AlertModel {
    id: number;
    content: string;
    linkedTo: string;
    status: boolean;

    constructor(init?: Partial<AlertModel>) {
        Object.assign(init, this);
    }
}
