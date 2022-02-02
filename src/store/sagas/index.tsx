import {all, call, put, takeLatest} from 'redux-saga/effects'
import { ActionType } from '../../types/enums';
import { IAction, IGif } from '../../types/interfaces';
import { GiphyFetch } from '@giphy/js-fetch-api'
import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { GiphyResponse } from '../model/giphy-response';

let jsonConvert: JsonConvert = new JsonConvert();
jsonConvert.operationMode = OperationMode.ENABLE; // print some debug data
jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null

// Giphy client 
const gf = new GiphyFetch('tVaJe9QRTL6VZp9xhBkogbNWFTI9hYnJ')


function* getGifsAsync(action: IAction){

    const nextType =  
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
                console.error((e));
            }
            return giphyResponse.data;
        }catch(e){
            console.error('error:', e)
            //TODO: set error state
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
        takeLatest(ActionType.LOADMORE_GIFS_FROM_API, getGifsAsync),

    ])
}