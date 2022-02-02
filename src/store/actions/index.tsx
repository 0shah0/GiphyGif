import { ActionType } from "../../types/enums";
import { IAction } from "../../types/interfaces";

export class Action implements IAction{
    constructor( 
        public type: ActionType, 
        public payload? : any
    ){}
}