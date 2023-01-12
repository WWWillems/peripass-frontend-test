import { ProfileNames } from "../../services/profiles/getall/ProfileNames";

export interface IProfile {
    id: string,
    name: ProfileNames
}

export interface IProfiles extends Array<IProfile>{}