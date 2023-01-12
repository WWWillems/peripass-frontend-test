import { FunctionComponent } from "react";
import Profile from "./Profile";
import { IProfile } from "../../common/interfaces/IProfile";
import useAppContext from "../useAppContext";
import { selectProfile } from "./profileSelectionActions";

const ProfileSelection: FunctionComponent = () => {

    const { state, dispatch } = useAppContext();
    const { profiles, selectedProfile } = state;

    if(selectedProfile) return null;
    
    const handleProfileSelected = (profile: IProfile): void => {
        selectProfile(dispatch, profile);
    }

    return (
        <div>
            <h1>Profile Selection</h1>
            <h2>Please select a profile to continue</h2>

            <ul>
                {
                    profiles?.map(profile => <Profile key={profile.id} profile={profile} onClick={handleProfileSelected} />)
                }
            </ul>
        </div>
    )
}

export default ProfileSelection;