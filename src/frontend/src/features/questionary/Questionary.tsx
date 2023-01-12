import { FunctionComponent } from "react";
import { IQuestion } from "../../common/interfaces/IQuestionary";
import { IAppContext } from "../AppContext";
import Navigation from "../navigation/Navigation";
import Question from "./Question";
import { goToHome, nextQuestion, previousQuestion } from "../navigation/navigationActions";
import { isQuestionAnswered, submitAnswers, validateAnswer } from "./helpers";
import { answerQuestion } from "./questionaryActions";
import useAppContext from "../useAppContext";
import { identifyVisitor } from "../identification/identificationActions";
import { IAnswer } from "../../common/interfaces/IAnswer";
import { IVisitor } from "../../common/interfaces/IVisitor";
import QuestionaryActionTypes from "./QuestionaryActionTypes";

const Questionary: FunctionComponent = () => {
    const context: IAppContext = useAppContext();
    const { state, dispatch } = context;
    const { selectedProfile, questionary, currentQuestionIndex, answers, isQuestionaryCompleted } = state;

    if (!questionary) {
        return null;
    }

    const { questions } = questionary;
    const amountOfQuestions: number = questions.length;

    const currentQuestion: IQuestion = questions[currentQuestionIndex];
    const isNextDisabled: boolean = !isQuestionAnswered(currentQuestion, answers);

    const handleClickHome = (): void => {
        goToHome(dispatch);
    }

    const handleClickPreviousQuestion = (): void => {
        previousQuestion(dispatch);
    }

    const handleClickNextQuestion = async (): Promise<void> => {
        const isIdentificationNeeded: boolean = currentQuestion.isIdentificationField;

        if (isIdentificationNeeded) {
            const currentAnswer: IAnswer | undefined = answers.get(currentQuestion.id);

            if (currentAnswer) {
                const visitorId: string = currentAnswer.value;
                const visitor: IVisitor | undefined = await identifyVisitor(visitorId);

                dispatch({
                    type: QuestionaryActionTypes.VISITOR_LOADED,
                    payload: visitor
                })
            }
        }

        const isAnswerValidated: boolean = validateAnswer(currentQuestion, answers);

        if (isAnswerValidated) {
            nextQuestion(dispatch);
        }
    }

    const handleChange = (answer: string): void => {
        answerQuestion(dispatch, currentQuestion.id, answer)
    }

    const handleClickSubmit = (): void => {
        submitAnswers(context);
    }

    const ButtonHome = () => <button onClick={handleClickHome} className="NavigationButtonHome">Home</button>

    if (isQuestionaryCompleted) {
        return (
            <div>
                <h1>Thanks for registering!</h1>

                <ButtonHome />
            </div>
        )
    }

    return (
        <div>
            <h1>You are {selectedProfile?.name.toLowerCase()}</h1>
            <h2>Please answer these {amountOfQuestions} questions to continue</h2>

            <Question question={currentQuestion} onChange={handleChange} />

            <Navigation
                isNextDisabled={isNextDisabled}
                onClickPrevious={handleClickPreviousQuestion}
                onClickNext={handleClickNextQuestion}
                onClickSubmit={handleClickSubmit}
            >
                <ButtonHome />
            </Navigation>
        </div>
    )
}

export default Questionary;