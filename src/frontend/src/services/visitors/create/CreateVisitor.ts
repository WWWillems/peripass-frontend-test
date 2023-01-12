import api from "../../../infrastructure/api";
import { IAnswer } from "../../../common/interfaces/IAnswer";
import ICreateVisitorRequest from "./ICreateVisitorRequest";
import ICreateVisitorResponse from "./ICreateVisitorResponse";

const createVisitor = async (fields: Array<IAnswer>, profileId: string) => {
    const params: ICreateVisitorRequest = {
        fields,
        profileId
    }

    const response: ICreateVisitorResponse = await api.post<any, ICreateVisitorResponse>(`/visitors`, params);
    const visitorId: string = response.data.visitorId;
    return visitorId;
}

export default createVisitor;