import { Action, ProfileSelectedAction, ProfilesLoadedAction, QuestionAnsweredAction, QuestionaryLoadedAction, VisitorLoadedAction } from "./questionaryActions";
import NavigationActionTypes from "../navigation/NavigationActionTypes";
import QuestionaryActionTypes from "./QuestionaryActionTypes";
import { IAnswers } from "../../common/interfaces/IAnswer";
import { IProfile, IProfiles } from "../../common/interfaces/IProfile";
import { IQuestionary } from "../../common/interfaces/IQuestionary";
import { IVisitor } from "../../common/interfaces/IVisitor";

export interface IQuestionaryState {
    selectedProfile: IProfile | undefined,
    profiles: IProfiles | undefined,
    currentQuestionIndex: number,
    questionary: IQuestionary | undefined,
    visitor: IVisitor | undefined,
    answers: IAnswers,
    isQuestionaryCompleted: boolean,
}

const questionaryReducer = (state: IQuestionaryState, action: Action): IQuestionaryState => {
    switch (action.type) {
        case QuestionaryActionTypes.PROFILES_LOADED: {
            const { payload } = action as ProfilesLoadedAction;
            return {
                ...state,
                profiles: payload
            }
        }

        case QuestionaryActionTypes.VISITOR_LOADED: {
            const { payload } = action as VisitorLoadedAction;

            if (payload) {
                const answers: IAnswers = new Map();

                payload?.fields.map(answer => {
                    answers.set(answer.questionId, answer);
                });

                return {
                    ...state,
                    visitor: payload,
                    answers
                }
            } else {
                return state;
            }
        }

        case QuestionaryActionTypes.QUESTIONARY_LOADED: {
            const { payload } = action as QuestionaryLoadedAction;
            return {
                ...state,
                questionary: payload
            }
        }

        case QuestionaryActionTypes.PROFILE_SELECTED: {
            const { payload } = action as ProfileSelectedAction;

            return {
                ...state,
                selectedProfile: payload
            };
        }

        case QuestionaryActionTypes.QUESTION_ANSWERED: {
            const { payload } = action as QuestionAnsweredAction;

            let answers = state.answers;

            if (payload.value && payload.value.length > 0) {
                answers = answers.set(payload.questionId, payload);
            } else {
                answers.delete(payload.questionId);
            }

            return {
                ...state,
                answers
            }
        }

        case QuestionaryActionTypes.QUESTIONARY_COMPLETED: {
            return {
                ...state,
                isQuestionaryCompleted: true,
            }
        }

        case NavigationActionTypes.HOME: {
            return {
                ...state,
                currentQuestionIndex: 0,
                selectedProfile: undefined,
                questionary: undefined,
                answers: new Map(),
                isQuestionaryCompleted: false,
                visitor: undefined,
            }
        }

        case NavigationActionTypes.NEXT: {
            const { currentQuestionIndex, questionary } = state;

            if (questionary) {
                const { questions } = questionary;

                let amountOfQuestions = questions.length;
                let nextQuestionIndex: number;

                if (currentQuestionIndex + 1 < amountOfQuestions) {
                    nextQuestionIndex = currentQuestionIndex + 1;
                } else {
                    nextQuestionIndex = amountOfQuestions - 1;
                }

                state = {
                    ...state,
                    currentQuestionIndex: nextQuestionIndex
                };
            }

            return state;
        }

        case NavigationActionTypes.PREVIOUS: {
            const { currentQuestionIndex } = state;

            let previousQuestionIndex: number;

            if (currentQuestionIndex - 1 >= 0) {
                previousQuestionIndex = currentQuestionIndex - 1;
            } else {
                previousQuestionIndex = 0;
            }

            return {
                ...state,
                currentQuestionIndex: previousQuestionIndex
            };
        }

        default: {
            throw Error('Unknown action: ' + action);
        }
    }
}

export default questionaryReducer;