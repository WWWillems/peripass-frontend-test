import { AxiosResponse } from "axios";
import { IVisitors } from "../../../common/interfaces/IVisitor";

interface ResponseData {
    visitors: IVisitors
}

export default interface IGetAllVisitorsResponse extends AxiosResponse<ResponseData> { }