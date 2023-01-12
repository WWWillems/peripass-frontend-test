import { AxiosResponse } from "axios";
import { IProfiles } from "../../../common/interfaces/IProfile";

interface ResponseData {
    profiles: IProfiles
}

export default interface IGetAllProfilesResponse extends AxiosResponse<ResponseData> { }