import { ProfileNames } from "../../services/profiles/getall/ProfileNames";
import QuestionTypes from "../../services/profiles/getquestionarybyid/QuestionTypes";

export interface IQuestion {
    id: string,
    type: QuestionTypes,
    text: string,
    isIdentificationField: boolean,
    isRequired: boolean,
    choices?: Array<string>
}
 
export interface IQuestionary {
    profileId: string,
    profileName: ProfileNames,
    questions: Array<IQuestion>
}