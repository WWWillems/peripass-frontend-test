import React from "react";
import getQuestionaryById from "../../services/profiles/getquestionarybyid/GetQuestionaryById";
import { IQuestionary } from "../../common/interfaces/IQuestionary";

const useQuestionary = (profileId: string | undefined) => {

    const [questionary, setQuestionary] = React.useState<IQuestionary>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>();

    const getQuestionaryFromByProfileId = async (profileId: string): Promise<void> => {
        try{
            const questionary = await getQuestionaryById(profileId);
            setQuestionary(questionary);
        }catch(error: any){
            setError(error);
        }finally{
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if(profileId){
            getQuestionaryFromByProfileId(profileId);
        }
    }, [profileId]);

    return {
        questionary,
        loading,
        error,
    }
}

export default useQuestionary;