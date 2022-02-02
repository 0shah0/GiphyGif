import React from 'react';
import './App.css';
import MainContainer from './components/containers/MainContainer/MainContainer';
import Modal from './components/view/Modal/Modal';

export class App extends React.Component{
render(): React.ReactNode {
    return(
      <main id="app">
        <Modal></Modal>
        <MainContainer></MainContainer>
      </main>
    );
  }  
}