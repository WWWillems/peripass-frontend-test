import { AxiosResponse } from "axios";
import { IVisitor } from "../../../common/interfaces/IVisitor";

interface ResponseData extends IVisitor { }

export default interface IGetVisitorByIdResponse extends AxiosResponse<ResponseData> { }