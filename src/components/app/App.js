import React, {Component} from 'react';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './app.css';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
    selectedPerson: null,
  };

  toggleRandomPlanet = () => {

  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col-md-12">
            <RandomPlanet/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} />
          </div>

          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
};