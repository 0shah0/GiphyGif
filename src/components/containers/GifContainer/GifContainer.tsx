import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { gifsSelector } from '../../../store/selector';
import { ActionType } from '../../../types/enums';
import { IAction, IAppState, IGif } from '../../../types/interfaces';
import FilterComponent from '../../view/FilterComponent/FilterComponent';
import GifList from '../../view/GifList/GifList';
import styles from './GifContainer.module.css';

interface GifContainerProps {
  getGifs: ()=>any
  getGifsByQuery: (query: string, offset: number)=>any
  loadMoreGifs: (query: string, offset: number)=> any
  setModalContent: (gif: IGif,)=> any
  setModalState: (value: boolean)=> any
  gifs: IGif[]
}
const storeToProps = (state:IAppState): Partial<GifContainerProps> => {
  return {
    gifs: gifsSelector(state)
  };
}
const actionsFromComponent = (dispatch: Dispatch<IAction>): GifContainerProps => {
  return {
    getGifs: () => dispatch({ type: ActionType.GET_GIFS_FROM_API }),
    getGifsByQuery: (query: string = '', offset=0) => dispatch(
      { 
        type: ActionType.SEARCH_GIFS_FROM_API, 
        payload: {
          query, 
          offset
      } 
    }),
    loadMoreGifs: (query: string = '', offset=0) => dispatch(
      { 
        type: ActionType.LOADMORE_GIFS_FROM_API, 
        payload: {
          query,
          offset
      } 
    }),
    setModalContent: (gif: IGif) => dispatch(
      { 
        type: ActionType.SET_MODAL_CONTENT, 
        payload:gif
    }),
    setModalState: (value: boolean) => dispatch(
      { 
        type: ActionType.SET_MODAL_STATE, 
        payload: value
    })
  } as GifContainerProps;
}

class GifContainer extends React.Component<GifContainerProps>{
    query: string = '';
    componentDidMount(){
      const {getGifs} = this.props;
      if(getGifs)
        getGifs();
      // TODO: else dispatch error  
    }
    dispatchSearchAction = (query: string)=>{
      const {getGifsByQuery} = this.props;

      if(getGifsByQuery)
        getGifsByQuery(query, 0);
      // TODO: else dispatch error  

      this.query = query;
    }
    onButtonCLickHandler = _.debounce((offset: number) => {
      const {loadMoreGifs} = this.props;

      if(loadMoreGifs)
        loadMoreGifs(this.query, offset);
      // TODO: else dispatch error  
    }, 300)

    onCardCLickHandler = _.debounce((gif: IGif, value: boolean) => {
      const {setModalContent, setModalState} = this.props;

      if(setModalContent)
      setModalContent(gif);
      // TODO: else dispatch error  

      if(setModalState)
      setModalState(value);
      // TODO: else dispatch error  

    }, 0)

    render(): React.ReactNode {
      const {gifs} = this.props;
      return(
        <div className={styles.GifContainer} data-testid="GifContainer">
          <FilterComponent 
            dispatchSearchAction={this.dispatchSearchAction}
          ></FilterComponent>
          <GifList 
            gifs={gifs}
            onButtonCLickHandler={this.onButtonCLickHandler}
            onCardCLickHandler={this.onCardCLickHandler}
          ></GifList>
        </div>
      )
    }
    
  }

export default connect(
  storeToProps,
  actionsFromComponent
)(GifContainer);