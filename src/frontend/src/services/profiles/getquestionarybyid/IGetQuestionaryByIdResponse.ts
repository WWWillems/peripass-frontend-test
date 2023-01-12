import { AxiosResponse } from "axios";
import { IQuestionary } from "../../../common/interfaces/IQuestionary";

interface ResponseData extends IQuestionary { }

export default interface IGetQuestionaryByIdResponse extends AxiosResponse<ResponseData> { }