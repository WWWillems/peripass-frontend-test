import api from "../../../infrastructure/api";
import IGetQuestionaryByIdRequest from "./IGetQuestionaryByIdRequest";
import IGetQuestionaryByIdResponse from "./IGetQuestionaryByIdResponse";
import { IQuestionary } from "../../../common/interfaces/IQuestionary";

const getQuestionaryById = async (profileId: string) => {
    const params: IGetQuestionaryByIdRequest = {
        profileId
    }

    const response: IGetQuestionaryByIdResponse = await api.get<any, IGetQuestionaryByIdResponse>(`/profiles/{id}/questionary`, { params });

    const questionary: IQuestionary = response.data;
    return questionary;
}

export default getQuestionaryById;