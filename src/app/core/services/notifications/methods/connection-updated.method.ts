import { BaseMethod } from "./base-method";

export class ConnectionUpdatedMethod implements BaseMethod {

    constructor(
        public data: ConnectionUpdatedMethodPayload
    ) { }
}

interface ConnectionUpdatedMethodPayload {
    otherId: string;
    notes: string;
    relationship: number;
}