import { IAppState, IGif } from "../types/interfaces";

export const gifsSelector = (state: IAppState): IGif[] => {
    return state.gifs;
}
export const modalStateSelector = (state: IAppState): boolean => {
    return state.modalState;
}

export const modalContentSelector = (state: IAppState): IGif => {
    return state.modalContent;
}