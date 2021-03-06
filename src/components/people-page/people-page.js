import React, {Component} from 'react';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import './people-page.css';
import SwapiService from '../../services';

class ErrorBoundry extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true});
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator/>
    }
    return this.props.children;
  }
}

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: null,
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
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {(i) => `${i.name} (${i.gender}, ${i.birthYear})`}
      </ItemList>
    );
    const personDetail = (<PersonDetails personId={this.state.selectedPerson}/>);

    return (
      <div className="people-page">
        <div className="row">
          <div className="col-md-6">
            {itemList}
          </div>

          <div className="col-md-6">
            {personDetail}
          </div>
        </div>
      </div>
    );
  }
}