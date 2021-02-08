import { BaseMethod } from './base-method';

export class ReadyMethod implements BaseMethod {

    constructor(
        public data: ReadyMethodMethodPayload
    ) { }
}

interface ReadyMethodMethodPayload {
    id: string;
    name: string;
    tag: string;
    avatarUrl: string;
    settings: UserSettingsPayload;
}

interface UserSettingsPayload {
    theme: number;
}
