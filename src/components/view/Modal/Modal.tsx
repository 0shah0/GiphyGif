import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { modalContentSelector, modalStateSelector } from '../../../store/selector';
import { ActionType } from '../../../types/enums';
import { IAction, IAppState, IGif } from '../../../types/interfaces';
import styles from './Modal.module.css';

interface ModalProps {
  modalState: boolean;
  modalContent: IGif;
  setModalContent: (gif: IGif)=> any,
  setModalState: (value: boolean)=> any
}

const storeToProps = (state:IAppState): Partial<ModalProps>  => {
  return {
    modalContent: modalContentSelector(state),
    modalState: modalStateSelector(state)
  };
}

const actionsFromComponent = (dispatch: Dispatch<IAction>): ModalProps => {
  return {
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
  } as ModalProps
}  

class Modal extends React.PureComponent<ModalProps>{

  closeTheModal = ()=>{
    const {setModalContent, setModalState} = this.props;

    if(setModalContent)
    setModalContent({} as IGif);
    // TODO: else dispatch error  

    if(setModalState)
    setModalState(false);
    // TODO: else dispatch error  
  }
  render(): React.ReactNode {
    const {modalState, modalContent} = this.props; 
      return(
         <>
          { modalState  && ( 
            <div className={styles.Modal} data-testid="Modal">
                <div className="blanket"></div>
                <div className='gifModal'>
                  <div className="title">
                    <h3>{modalContent?.title}</h3>
                  </div>
                  <div className="content"> 
                    <img alt={modalContent?.title} className="img-fluid" src={modalContent?.images?.preview?.url}></img>
                  </div> 
                  <div className="actions d-flex mt-2 justify-content-end"> 
                    <button className='btn btn-primary' onClick={this.closeTheModal}> Close</button>
                  </div> 
                </div>
              </div>
            )  
          }   
          </>
     
      )
  }
}
export default connect(
  storeToProps,
  actionsFromComponent
)(Modal);
