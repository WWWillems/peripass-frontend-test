import React, { FunctionComponent, useContext } from "react";
import { AppContext } from "../AppContext";

type AnswerInputProps = {
    onChange: (answer: string) => void,
}

const AnswerInput: FunctionComponent<AnswerInputProps> = (props: AnswerInputProps) => {
    const { state } = useContext(AppContext);
    const { questionary, currentQuestionIndex, answers } = state;

    if (!questionary) return null;

    const { questions } = questionary;

    const currentQuestion = questions[currentQuestionIndex];
    const defaultAnswer = answers.get(currentQuestion.id)?.value;

    const { onChange } = props;
    const { type, isRequired, choices } = currentQuestion;

    const isChoice: boolean = !!choices;

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(evt.target.value);
    }

    const handleChoice = (evt: React.MouseEvent<HTMLAnchorElement>): void => {
        const selection: string = (evt.target as Element).id;
        onChange(selection);
    }

    return (
        <div>
            {!isChoice && <input
                key={currentQuestion.id}
                defaultValue={defaultAnswer}
                type={type.toLowerCase()}
                required={isRequired}
                autoFocus={true}
                onChange={handleChange}
                min={0}
            />}

            {isChoice && (
                <ul>
                    {
                        choices?.map(choice => <li key={choice}><a id={choice} href="#" onClick={handleChoice} className={defaultAnswer === choice ? "SelectedChoice" : undefined}>{choice}</a></li>)
                    }
                </ul>
            )}
        </div>
    )
}

export default AnswerInput;