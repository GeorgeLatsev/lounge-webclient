export interface Connection {
    otherId: string;
    name: string;
    tag: string;
    avatarUrl: string;
    notes: string;
    relationship: RelationshipEnum;
}


export enum RelationshipEnum {
    None = 0,
    IncomingRequest = 1,
    OutgoingRequest = 2,
    Friend = 3,
    Blocked = 4,
    BeingBlocked = 5
}