import { ActionType } from "./enums";

interface IImage{
    downsizedStill: IDownsizedStill,
    preview: IPreview
}
interface IDownsizedStill {
    url: string;
}
interface IPreview {
    url: string;
}
export interface IGif {
    title: string,
    images: IImage,
    id: string,
    source: string
}
export interface IAppState {
    gifs: IGif[],
    modalContent: IGif
    modalState: boolean
}
export interface IAction {
    type: ActionType;
    payload?: any
}