import api from "../../../infrastructure/api";
import IGetVisitorByIdRequest from "./IGetVisitorByIdRequest";
import IGetVisitorByIdResponse from "./IGetVisitorByIdResponse";
import { IVisitor } from "../../../common/interfaces/IVisitor";

const getVisitorById = async (id: string) => {
    const params: IGetVisitorByIdRequest = {
        id
    }

    const response: IGetVisitorByIdResponse = await api.get<any, IGetVisitorByIdResponse>(`/visitors/${params.id}`);

    const visitor: IVisitor = response.data;
    return visitor;
}

export default getVisitorById;