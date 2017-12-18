import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
  Link
} from 'react-router-dom'

import Navigation from './Navigation';
import PlayerInfoForm from './PlayerInfoForm';
import CharacterSelectList from './CharacterSelectList';

// @todo make into static/constants
const api_key = "b8f2f9674ea24761bfe8f0a49a84d3a3";
const host = 'https://www.bungie.net/Platform/Destiny2/';
const requestHeaders = {
  method: 'GET',
  mode: 'cors',
  headers: new Headers({
    "X-API-Key": api_key
  })
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'test',
      userPlatform: '4',
      membershipId: '1',
      characterData: [],
      characterId: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMembershipChange = this.handleMembershipChange.bind(this);
    this.handleCharacterListChange = this.handleCharacterListChange.bind(this);
  }

  // Callback methods
  handleInputChange(userName) {
    this.setState({
      userName: userName
    });
  }

  handleMembershipChange(membershipId) {
    this.setState({
      membershipId: membershipId
    });
  }

  handleCharacterListChange(characterData) {

    this.setState({
      characterData: [...this.state.characterData, characterData]
    });

    console.log(this.state.characterData);
  }

  render () {
    return (
      <div>
        <Navigation />
        <Router>
          <section className="main">
            <Switch>
              <Route exact path="/" render={ () => 
                <PlayerInfoForm 
                  onCharacterListChange={this.handleCharacterListChange}
                  onMembershipChange={this.handleMembershipChange}
                  onHandleInputChange={this.handleInputChange}
                /> 
              } />
              <Route path="/character" render={ () => <CharacterSelectList characterData={this.state.characterData} /> } />
            </Switch>
          </section>
        </Router>
      </div>
    )
  }
}

// {this.state.membershipId}
