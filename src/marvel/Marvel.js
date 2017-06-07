import React, { Component } from 'react';
import qs from 'querystringify';

import List from './character-list/List';
import Detail from './character-detail/Detail';
import './Marvel.css';

import marvelConfig from '../../conf/marvel.json';

class Marvel extends Component {

  state = {
    characters: [],
    currentCharacter: null
  };

  async componentDidMount() {
    const offset = 100;
    const queryStringParams = Object.assign({
      offset: 100
    }, marvelConfig);
    const response = await fetch(`http://gateway.marvel.com/v1/public/characters?${qs.stringify(queryStringParams)}`);
    const jsonResponse = await response.json();
    const newState = Object.assign({}, this.state, {characters: jsonResponse.data.results});
    this.setState(newState);
  }

  handleNavigate = (e, stateUpdate) => {
    e.preventDefault();
    const newState = Object.assign({}, this.state, stateUpdate);
    this.setState(newState);
  };

  getCharacterDetail = character => (<Detail
    character={character}
    handleNavigate={this.handleNavigate}
  ></Detail>);
  getCharacterList = () => (<List
    characters={this.state.characters}
    handleNavigate={this.handleNavigate}
  ></List>);

  render() {
    const displayedComponent = this.state.currentCharacter
      ? this.getCharacterDetail(this.state.currentCharacter)
      : this.getCharacterList();

    return (
      <div id="marvel">
        {displayedComponent}
      </div>
    );
  }
}

export default Marvel;
