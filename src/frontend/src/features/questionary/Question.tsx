import { FunctionComponent } from "react";
import { IQuestion } from "../../common/interfaces/IQuestionary";
import AnswerInput from "./AnswerInput";

type QuestionProps = {
    question: IQuestion,
    onChange: (answer: string) => void
}

const Question: FunctionComponent<QuestionProps> = (props: QuestionProps) => {
    const { question, onChange } = props;
    const { text, isRequired } = question;

    return (
        <div className="Question">
            <h3>{text}{ isRequired && <span className="Required"> *</span>}</h3>

            <AnswerInput onChange={onChange} />             
        </div>
    )
}

export default Question;