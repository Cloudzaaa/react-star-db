import React, {Component} from 'react';
import ItemList from '../item-list';
import PlanetDetails from '../planet-details';
import ErrorIndicator from '../error-indicator';
import './planet-page.css';
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

export default class PlanetPage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPlanet: null,
  };

  onPlanetSelected = (id) => {
    this.setState({
      selectedPlanet: id,
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    const itemList = (
      <ItemList
        onItemSelected={this.onPlanetSelected}
        getData={this.swapiService.getAllPlanets}
      >
        {(i) => `${i.name}`}
      </ItemList>
    );
    const planetDetail = (<PlanetDetails planetId={this.state.selectedPlanet}/>);

    return (
      <div className="people-page">
        <div className="row">
          <div className="col-md-6">
            {itemList}
          </div>

          <div className="col-md-6">
            {planetDetail}
          </div>
        </div>
      </div>
    );
  }
}