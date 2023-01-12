export interface IAnswer {
    questionId: string,
    value: string,
}

export interface IAnswers extends Map<string, IAnswer> { }
