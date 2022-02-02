import React from 'react';
import { IGif } from '../../../types/interfaces';
import styles from './GifList.module.css';

interface GifListProps {
  gifs: IGif[]
  onButtonCLickHandler: (offset:number)=>any
  onCardCLickHandler: (gif:IGif, value: boolean)=>any
}

interface GifListState {
  buttonText: string;
}
class GifList extends React.PureComponent<GifListProps, GifListState>{

   constructor(props: GifListProps){
    super(props);
    this.state = {
      buttonText : 'Load More'
     }
    }
    componentDidUpdate(prevProps: GifListProps) {
      if(prevProps.gifs.length !== this.props.gifs.length)
      this.setState({buttonText: 'Load More'});
    }
    onButtonClick = ()=>{
      const {gifs, onButtonCLickHandler} = this.props;
      this.setState({buttonText: 'Loading...'});
      onButtonCLickHandler(gifs.length);
    }
    onCardClick = (gif:IGif)=>{
      const {onCardCLickHandler} = this.props;
      onCardCLickHandler(gif, true);
    }
    render(): React.ReactNode {
      const {gifs} = this.props;
      return(
        <div className={styles.GifList} data-testid="GifList">
          <div className="container">
            <div className="row">
                {gifs.map((gif)=>
                    <div className="col-12 col-md-3 p-2" onClick={()=>{ this.onCardClick(gif)}} key={gif.id}>
                      <div className="frameImage">
                        <img alt={gif.title} className="img-fluid"src={gif.images.downsizedStill.url}/>
                      </div>
                    </div>
                )}
            </div>
          </div>  
          <div className="container container-load-more">
            <div className="row justify-content-center">
               <button className='btn btn-primary mt-4 col-12 col-md-4' onClick={this.onButtonClick}> {this.state.buttonText} </button>
            </div>
          </div>    
        </div>
      );
    }  
}
export default GifList;
