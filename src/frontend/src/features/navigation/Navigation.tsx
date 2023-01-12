import { FunctionComponent, MouseEventHandler, PropsWithChildren } from "react";
import useAppContext from "../useAppContext";

export type NavigationProps = PropsWithChildren<{
    isNextDisabled: boolean,
    onClickPrevious: MouseEventHandler<HTMLButtonElement>,
    onClickNext: MouseEventHandler<HTMLButtonElement>,
    onClickSubmit: MouseEventHandler<HTMLButtonElement>
}>

const Navigation: FunctionComponent<NavigationProps> = (props: NavigationProps) => {
    const { state } = useAppContext();
    const { questionary, currentQuestionIndex } = state;

    const { onClickPrevious, onClickNext, onClickSubmit, isNextDisabled } = props;

    if (!questionary) {
        return null;
    }

    const { questions } = questionary;
    const amountOfQuestions: number = questions.length;

    const isButtonPreviousDisabled: boolean = currentQuestionIndex === 0;
    const isLastQuestion: boolean = currentQuestionIndex === amountOfQuestions - 1;

    return (
        <div className="Navigation">
            {props.children}

            <button onClick={onClickPrevious} disabled={isButtonPreviousDisabled} className="NavigationButtonPrevious">Previous</button>
            
            {!isLastQuestion && <button onClick={onClickNext} disabled={isNextDisabled} className="NavigationButtonNext">Next</button>}
            {isLastQuestion && <button onClick={onClickSubmit} disabled={isNextDisabled} className="NavigationButtonSubmit">Submit</button>}
        </div>
    )
}

export default Navigation;