import React, {Component} from 'react';
import SwapiService from '../../services';
import './person-details.css';
import Loader from '../loader';

class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
    loading: false,
  };

  componentDidMount() {
    this.updatePerson();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.personId !== prevProps.personId){
      this.updatePerson();
    }
  };

  updatePerson() {
    const {personId} = this.props;
    if(!personId) {
      return;
    }

    this.setState({loading: true});

    this.swapiService
        .getPerson(personId)
        .then((person) => {
          this.setState({person, loading: false});
        });
  };

  render() {
    if(!this.state.person) {
      return <span>Select a person from a list</span>;
    }

    const {loading, person} = this.state;
    const hasData = !loading;
    const loader= loading ? <Loader /> : null;
    const content = hasData ? <PersonView person={person}/> : null;

    return (
      <div className="person-details card">
        {loader}
        {content}
      </div>
    );
  }
}

const PersonView = ({person}) => {
  const {id, name, gender, birthYear, eyeColor} = person;
  return (
    <>
      <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="character" className="person-image"/>

      <div className="card-body">
        <h4>{name} {id}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span className="term"> {gender}</span>
          </li>

          <li className="list-group-item">
            <span className="term">Birth year</span>
            <span className="term"> {birthYear}</span>
          </li>

          <li className="list-group-item">
            <span className="term">Eye color</span>
            <span className="term"> {eyeColor}</span>
          </li>
        </ul>
      </div>
    </>
  )
};

export default PersonDetails;