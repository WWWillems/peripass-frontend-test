import api from "../../../infrastructure/api";
import { IVisitors } from "../../../common/interfaces/IVisitor";
import IGetAllVisitorsResponse from "./IGetAllVisitorsResponse";

const getAllVisitors = async () => {
    const response: IGetAllVisitorsResponse = await api.get<any, IGetAllVisitorsResponse>(`/visitors`);
    const visitors: IVisitors = response.data.visitors;
    return visitors;
}

export default getAllVisitors;