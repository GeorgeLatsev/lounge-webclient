import { BaseMethod } from "./base-method";

export class ConnectionCreatedMethod implements BaseMethod {

    constructor(
        public data: ConnectionCreatedMethodPayload
    ) { }
}

interface ConnectionCreatedMethodPayload {
    otherId: string;
    name: string;
    tag: string;
    avatarUrl: string;
}