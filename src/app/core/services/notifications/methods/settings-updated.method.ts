import { BaseMethod } from "./base-method";

export class SettingsUpdatedMethod implements BaseMethod {

    constructor(
        public data: SettingsUpdatedMethodPayload
    ) { }
}

interface SettingsUpdatedMethodPayload {
    theme: number;
}