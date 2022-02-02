import React from 'react';
import styles from './FilterComponent.module.css';
import _ from 'lodash'

interface FilterComponentProps {
  dispatchSearchAction: (q: string)=>void
}
interface FilterComponentState {
  query: string;
}

class FilterComponent extends React.PureComponent<FilterComponentProps,FilterComponentState>{

  constructor(props: FilterComponentProps){
    super(props);
    this.state = {
      query: ''
    }
  }
  initSearch = _.debounce(()=>{
    const {query} = this.state;
    const {dispatchSearchAction} = this.props;
    dispatchSearchAction(query);
  }, 500)

  onChangeHandler = (e: any)=>{
    this.setState({
        query: e.target.value
    });
    this.initSearch();
  }  
  render(): React.ReactNode {
      return(
        <div className={styles.FilterComponent} data-testid="FilterComponent">
          <div className="container filter-container">
            <div className="row"> 
              <input 
                type="text" 
                name="queryInput" 
                value={this.state.query} 
                placeholder="Search the GIPHY!"
                onChange={this.onChangeHandler}
              />
            </div>
          </div>
        </div>
      )
  }
}

export default FilterComponent;
