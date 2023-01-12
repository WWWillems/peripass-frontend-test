import React, { createContext, useReducer } from "react";
import useProfiles from "./profileselection/useProfiles";
import { Action } from "./questionary/questionaryActions";
import QuestionaryActionTypes from "./questionary/QuestionaryActionTypes";
import reducer, { IQuestionaryState } from "./questionary/questionaryReducer";
import useQuestionary from "./questionary/useQuestionary";

export interface IAppContext {
    state: IQuestionaryState,
    dispatch: React.Dispatch<Action>
}

const initialQuestionaryState = {
    selectedProfile: undefined,
    profiles: undefined,
    currentQuestionIndex: 0,
    questionary: undefined,
    visitor: undefined,
    answers: new Map(),
    isQuestionaryCompleted: false,
}

const appContext: IAppContext = {
    state: initialQuestionaryState,
    dispatch: () => null,
}

export const AppContext = createContext<IAppContext>(appContext);

type AppContextProviderProps = {
    children: React.ReactNode
}

export const AppContextProvider = (props: AppContextProviderProps) => {

    const [state, dispatch] = useReducer(reducer, initialQuestionaryState);

    // TODO: Implement loading & error states from custom hook
    const { profiles } = useProfiles();
    const { questionary } = useQuestionary(state?.selectedProfile?.id);

    React.useEffect(() => {
        if (profiles) {
            dispatch({
                type: QuestionaryActionTypes.PROFILES_LOADED,
                payload: profiles
            });
        }
    }, [profiles]);

    React.useEffect(() => {
        if (questionary) {
            dispatch({
                type: QuestionaryActionTypes.QUESTIONARY_LOADED,
                payload: questionary
            });
        }
    }, [questionary]);

    const appReducer = {
        state,
        dispatch
    };

    return (
        <AppContext.Provider value={appReducer}>
            {props.children}
        </AppContext.Provider>
    )
}