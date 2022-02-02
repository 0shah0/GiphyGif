import {all, call, put, takeLatest} from 'redux-saga/effects'
import { ActionType } from '../../types/enums';
import { IAction, IErrorObject, IGif } from '../../types/interfaces';
import { GiphyFetch } from '@giphy/js-fetch-api'
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { GiphyResponse } from '../model/giphy-response';
import { environment } from '../../env.dev';

let jsonConvert: JsonConvert = new JsonConvert();
// print some debug data
jsonConvert.operationMode = OperationMode.ENABLE; 
// don't allow assigning number to string etc.
jsonConvert.ignorePrimitiveChecks = false; 
// never allow null
jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; 

// Giphy client 
const gf = new GiphyFetch(environment.API_KEY);


function* getGifsAsync(action: IAction){

    let nextType =  
        (action.type === ActionType.LOADMORE_GIFS_FROM_API) ? 
        ActionType.APPEND_GIFS_TO_STORE : 
        ActionType.UPDATE_GIFS_TO_STORE;

    const {query, offset} =  action.payload || {};
    const options = {
        limit : 12,
        offset : offset || 0
    }

    const res: IGif[] = yield call(async function(){
        try{
            let response =  await gf.search(query || 'Hey there!', options);
            // Map to the GiphyResponse class
            let giphyResponse: GiphyResponse = {} as GiphyResponse;
            try {
                giphyResponse = jsonConvert.deserializeObject(response, GiphyResponse);
            } catch (e) {
                console.error('deserializeObject Error:', e);
                nextType = ActionType.SET_API_ERROR;
                return {    
                    hasError : true,
                    message: e.message
                } as IErrorObject
                
            }
            return giphyResponse.data;
        }catch(e){
            console.error('Giphy API error:', e);
            nextType = ActionType.SET_API_ERROR;
                return {    
                    hasError : true,
                    message: e.message
                } as IErrorObject
        }
        
    });
    yield all([
        put({
            type : nextType,
            payload: res
        })
    ]);    
}
export function* rootSaga () {
    yield all([
        takeLatest(ActionType.GET_GIFS_FROM_API, getGifsAsync),
        takeLatest(ActionType.SEARCH_GIFS_FROM_API, getGifsAsync),
        takeLatest(ActionType.LOADMORE_GIFS_FROM_API, getGifsAsync)
    ])
}