import { AxiosResponse } from "axios";

interface ResponseData {
    visitorId: string,
 }

export default interface IPatchVisitorResponse extends AxiosResponse<ResponseData> { }