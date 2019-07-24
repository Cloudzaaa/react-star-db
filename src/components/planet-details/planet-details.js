import React, {Component} from 'react';
import SwapiService from '../../services';
import './planet-details.css';
import Loader from '../loader';

class PlanetDetails extends Component {
    swapiService = new SwapiService();

    state = {
        planet: null,
        loading: false,
    };

    componentDidMount() {
        this.updatePlanet();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.planetId !== prevProps.planetId){
            this.updatePlanet();
        }
    };

    updatePlanet() {
        const {planetId} = this.props;
        if(!planetId) {
            return;
        }

        this.setState({loading: true});

        this.swapiService
            .getPlanet(planetId)
            .then((planet) => {
                this.setState({planet, loading: false});
            });
    };

    render() {
        if(!this.state.planet) {
            return <span>Select a planet from a list</span>;
        }

        const {loading, planet} = this.state;
        const hasData = !loading;
        const loader= loading ? <Loader /> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;

        return (
          <div className="planet-details card">
              {loader}
              {content}
          </div>
        );
    }
}

const PlanetView = ({planet}) => {
    const {id, name, population, rotation} = planet;
    return (
      <>
          <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="planet" className="planet-image"/>

          <div className="card-body">
              <h4>{name} {id}</h4>
              <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                      <span className="term">Name </span>
                      <span className="term">{name}</span>
                  </li>

                  <li className="list-group-item">
                      <span className="term">Population </span>
                      <span className="term">{population}</span>
                  </li>

                  <li className="list-group-item">
                      <span className="term">Rotation period </span>
                      <span className="term">{rotation}</span>
                  </li>
              </ul>
          </div>
      </>
    )
};

export default PlanetDetails;