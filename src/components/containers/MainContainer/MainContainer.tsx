import React from 'react';
import GifContainer from '../GifContainer/GifContainer';
import styles from './MainContainer.module.css';

interface MainContainerProps {}

class MainContainer extends React.Component<MainContainerProps>{
  render(): React.ReactNode {
    return(
      <div className={styles.MainContainer} data-testid="MainContainer">
        <GifContainer></GifContainer>
      </div>
    );
  }  
}

export default MainContainer;
