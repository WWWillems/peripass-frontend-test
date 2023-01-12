import { Dispatch } from "react";
import NavigationActionTypes from "./NavigationActionTypes";

export interface NavigationAction {
    type: NavigationActionTypes
}

export const goToHome = (dispatch: Dispatch<NavigationAction>): void => {
    dispatch({
        type: NavigationActionTypes.HOME
    });
}

export const nextQuestion = (dispatch: Dispatch<NavigationAction>): void => {
    dispatch({
        type: NavigationActionTypes.NEXT
    });
}

export const previousQuestion = (dispatch: Dispatch<NavigationAction>): void => {
    dispatch({
        type: NavigationActionTypes.PREVIOUS
    });
}