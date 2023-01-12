import React from "react";
import getAllProfiles from "../../services/profiles/getall/GetAllProfiles";
import { IProfiles } from "../../common/interfaces/IProfile";

const useProfiles = () => {

    const [profiles, setProfiles] = React.useState<IProfiles>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>();

    const getProfiles = async () => {
        try{
            const allProfiles = await getAllProfiles();
        
            setProfiles(allProfiles);
        }catch(error: any){
            setError(error);
        }finally{
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getProfiles();
    }, []);

    return {
        profiles,
        loading,
        error
    }
}

export default useProfiles;