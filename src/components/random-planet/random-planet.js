import React, {Component} from 'react';
import './random-planet.css';
import SwapiService from '../../services/swapi';
import ErrorIndicator from '../error-indicator';
import Loader from '../loader';

class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 6000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({planet, loading: false});
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 3;
    this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError);
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  render() {
    const {planet, loading, error} = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null;
    const loader = loading ? <Loader/> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {loader}
        {content}
      </div>
    );
  }
}

const PlanetView = ({planet}) => {
  const {id, name, population, rotation, diameter} = planet;

  return (
    <>
      <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="" className="planet-image"/>
      <div>
        <h4 className="planet-name">{name}</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="term">Population </span>
            <span>{population}</span>
          </li>

          <li className="list-group-item">
            <span className="term">Rotation Period </span>
            <span>{rotation}</span>
          </li>

          <li className="list-group-item">
            <span className="term">Diameter </span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  )
};

export default RandomPlanet;