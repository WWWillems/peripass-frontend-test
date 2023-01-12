import { Dispatch } from "react";
import { IProfile } from "../../common/interfaces/IProfile"
import { Action } from "../questionary/questionaryActions";
import QuestionaryActionTypes from "../questionary/QuestionaryActionTypes"

export const selectProfile = (dispatch: Dispatch<Action>, profile: IProfile): void => {
    dispatch({
        type: QuestionaryActionTypes.PROFILE_SELECTED,
        payload: profile
    });
}