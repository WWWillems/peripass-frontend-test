import { IAnswer, IAnswers } from "../../common/interfaces/IAnswer";
import { IProfile } from "../../common/interfaces/IProfile";
import { IQuestion } from "../../common/interfaces/IQuestionary";
import createVisitor from "../../services/visitors/create/CreateVisitor";
import getVisitorById from "../../services/visitors/getvisitorbyid/GetVisitorById";
import { IVisitor } from "../../common/interfaces/IVisitor";
import updateVisitor from "../../services/visitors/patch/PatchVisitor";

export const createNewVisitor = async (
    questions: Array<IQuestion>, 
    answers: IAnswers, 
    selectedProfile: IProfile
): Promise<string> => {
    const fields: Array<IAnswer> = mapQuestionsToAnswersFields(questions, answers);

    const visitorId: string = await createVisitor(fields, selectedProfile?.id);
    return visitorId;
}

export const updateExistingVisitor = async(
    visitorId: string, 
    questions: Array<IQuestion>, 
    answers: IAnswers, 
    selectedProfile: IProfile
): Promise<string> => {
    const fields: Array<IAnswer> = mapQuestionsToAnswersFields(questions, answers);
    
    const id: string = await updateVisitor(visitorId, fields, selectedProfile?.id);
    return id;
}

export const identifyVisitor = async (id: string): Promise<IVisitor | undefined> => {
    let visitor: IVisitor | undefined = undefined;
    
    try{
        visitor = await getVisitorById(id);

        return visitor;
    }catch(error){
        return undefined;
    }
}

const mapQuestionsToAnswersFields = (questions: Array<IQuestion>, answers: IAnswers): Array<IAnswer> => {
    const fields: Array<IAnswer> = questions.map(question => {
        return {
            questionId: question.id,
            value: answers.get(question.id)?.value || ""
        }
    });

    return fields;
}