import React, {Component} from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import './people-page.css';

class PeoplePage extends Component {
  state = {
    selectedPerson: null,
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: false});
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <div className="people-page">
        <div className="row">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected}/>
          </div>

          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
      </div>
    );
  }
}

export default PeoplePage;