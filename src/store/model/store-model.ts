import { IAppState, IErrorObject, IGif } from "../../types/interfaces";

export class AppState implements IAppState{
    gifs: IGif[] = [];
    modalContent: IGif = {} as IGif;
    modalState: boolean = false;
    error: IErrorObject = {hasError: false, message: ''}
}