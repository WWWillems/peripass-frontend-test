import { Dispatch } from "react"
import { IAnswer } from "../../common/interfaces/IAnswer"
import { IProfile, IProfiles } from "../../common/interfaces/IProfile"
import { IQuestionary } from "../../common/interfaces/IQuestionary"
import { IVisitor } from "../../common/interfaces/IVisitor"
import { NavigationAction } from "../navigation/navigationActions"
import QuestionaryActionTypes from "./QuestionaryActionTypes"

export interface ProfilesLoadedAction {
    type: QuestionaryActionTypes
    payload: IProfiles
}

export interface QuestionaryLoadedAction {
    type: QuestionaryActionTypes
    payload: IQuestionary
}

export interface ProfileSelectedAction {
    type: QuestionaryActionTypes,
    payload: IProfile
}

export interface QuestionAnsweredAction {
    type: QuestionaryActionTypes,
    payload: IAnswer
}

export interface QuestionaryCompletedAction {
    type: QuestionaryActionTypes,
    payload: string
}

export interface VisitorLoadedAction {
    type: QuestionaryActionTypes,
    payload: IVisitor | undefined
}

// TODO: Improve union type, so we don't have to cast actions in reducer
export type Action = |
    NavigationAction |
    ProfilesLoadedAction |
    VisitorLoadedAction |
    QuestionaryLoadedAction |
    ProfileSelectedAction |
    QuestionAnsweredAction |
    QuestionaryCompletedAction;

export const answerQuestion = (dispatch: Dispatch<QuestionAnsweredAction>, questionId: string, value: string): void => {    
    const answer: IAnswer = {
        questionId,
        value
    };

    dispatch({
        type: QuestionaryActionTypes.QUESTION_ANSWERED,
        payload: answer
    });
}