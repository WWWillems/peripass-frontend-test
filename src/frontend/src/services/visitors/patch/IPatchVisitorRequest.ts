import { IAnswer } from "../../../common/interfaces/IAnswer";

export default interface IPatchVisitorRequest {
    fields: Array<IAnswer>,
    profileId: string
}