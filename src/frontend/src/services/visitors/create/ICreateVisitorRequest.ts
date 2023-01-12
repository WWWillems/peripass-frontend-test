import { IAnswer } from "../../../common/interfaces/IAnswer";

export default interface ICreateVisitorRequest {
    fields: Array<IAnswer>,
    profileId: string
}