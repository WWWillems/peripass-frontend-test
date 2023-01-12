import { IAnswer } from "./IAnswer";

export interface IVisitor {
    id: string,
    profileId: string,
    fields: Array<IAnswer>
}

export interface IVisitors extends Array<IVisitor> { }