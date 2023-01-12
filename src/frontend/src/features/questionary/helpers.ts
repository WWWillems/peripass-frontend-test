import { IAnswers } from "../../common/interfaces/IAnswer";
import { IQuestion } from "../../common/interfaces/IQuestionary";
import { IAppContext } from "../AppContext";
import { createNewVisitor, updateExistingVisitor } from "../identification/identificationActions";
import QuestionaryActionTypes from "./QuestionaryActionTypes";

export const validateAnswer = (currentQuestion: IQuestion, answers: IAnswers): boolean => {
    if(currentQuestion.isRequired){
        // Required answers need validation
        return isQuestionAnswered(currentQuestion, answers);
    }else{
        // Answer not required, user may continue
        return true;
    }     
}

export const isQuestionAnswered = (question: IQuestion, answers: IAnswers): boolean => {
    let result: boolean = false;
    const isQuestionAnswered: boolean = answers?.has(question.id);

    if(isQuestionAnswered){
        result = true;
    }

    return result;
}

export const submitAnswers = async (context: IAppContext): Promise<void> => {
    const { state, dispatch } = context;
    const { questionary, answers, selectedProfile, visitor } = state;

    if(!questionary) throw new Error(`No questionary found.`);
    if(!selectedProfile) throw new Error(`No profile selected.`);

    const { questions } = questionary;

    let visitorId: string | undefined = undefined;

    // Check for exisiting visitor (see identification fields)
    if(visitor){
        // In case for existing visitor, UPDATE visitor
        visitorId = await updateExistingVisitor(visitor.id, questions, answers, selectedProfile);
        console.log(`Visitor ${visitorId} updated!`);
    }else{
        // If no existing visitor, CREATE new visitor
        visitorId = await createNewVisitor(questions, answers, selectedProfile);
        console.log(`Visitor ${visitorId} created!`);
    }

    dispatch({
        type: QuestionaryActionTypes.QUESTIONARY_COMPLETED,
        payload: visitorId
    })
}