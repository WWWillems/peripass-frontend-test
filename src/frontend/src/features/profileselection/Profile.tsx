import { FunctionComponent } from "react";
import { IProfile } from "../../common/interfaces/IProfile";

type ProfileProps = {
    profile: IProfile,
    onClick: (profile: IProfile) => void,
}

const Profile: FunctionComponent<ProfileProps> = (props: ProfileProps) => {
    const { profile, onClick } = props;
    const { name } = profile;

    return (
        <li>
            <a href="#" onClick={() => onClick(profile)}>{name}</a>
        </li>
    )
}

export default Profile;