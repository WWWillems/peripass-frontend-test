import { IAnswer } from "../../../common/interfaces/IAnswer";
import api from "../../../infrastructure/api";
import IPatchVisitorRequest from "./IPatchVisitorRequest";
import IPatchVisitorResponse from "./IPatchVisitorResponse";

const updateVisitor = async (id: string, fields: Array<IAnswer>, profileId: string) => {
    const params: IPatchVisitorRequest = {
        fields,
        profileId
    }

    const response: IPatchVisitorResponse = await api.patch<any, IPatchVisitorResponse>(`/visitors/${id}`, params);
    const visitorId: string = response.data.visitorId;
    return visitorId;
}

export default updateVisitor;