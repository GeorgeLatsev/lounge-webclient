import { BaseMethod } from "./base-method";

export class UserUpdatedMethod implements BaseMethod {

    constructor(
        public data: UserUpdatedMethodPayload
    ) { }
}

interface UserUpdatedMethodPayload {
    id: string;
    name: string;
    tag: string;
    avatarUrl: string;
}