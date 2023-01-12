import { AxiosResponse } from "axios";

interface ResponseData {
    visitorId: string,
 }

export default interface ICreateVisitorResponse extends AxiosResponse<ResponseData> { }