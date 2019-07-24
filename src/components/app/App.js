import React, {Component} from 'react';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './app.css';
import PeoplePage from '../people-page';
import PlanetPage from '../planet-page';
import Row from '../row';
import SwapiService from '../../services';

export default class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col-md-12">
            <RandomPlanet />
          </div>
        </div>

        <PeoplePage />
        <PlanetPage />

      </div>
    );
  }
};