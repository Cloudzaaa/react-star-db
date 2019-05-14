import React, {Component} from 'react';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './app.css';
import PeoplePage from '../people-page';

export default class App extends Component {

  state = {
    showRandomPlanet: true,
  };

  toggleRandomPlanet = () => {

  };

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col-md-12">
            <RandomPlanet/>
          </div>
        </div>

        <PeoplePage />

        <PeoplePage />

        <PeoplePage />
      </div>
    );
  }
};