import api from "../../../infrastructure/api";
import IGetAllProfilesResponse from "./IGetAllProfilesResponse";
import { IProfiles } from "../../../common/interfaces/IProfile";

const getAllProfiles = async () => {
    const response: IGetAllProfilesResponse = await api.get<any, IGetAllProfilesResponse>(`/profiles`);
    const profiles: IProfiles = response.data.profiles;
    return profiles;
}

export default getAllProfiles;