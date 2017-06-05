import React, { Component } from 'react';
import qs from 'querystringify';

import List from './character-list/List';
import Detail from './character-detail/Detail';
import './Marvel.css';

class Marvel extends Component {

  state = {
    characters: [],
    currentCharacter: null
  };

  async componentDidMount() {
    const getParameters = {
      offset: 100,
      ts: 'x',
      apikey: 'xxx',
      hash: 'xxx'
    };

    const response = await fetch(`http://gateway.marvel.com/v1/public/characters?${qs.stringify(getParameters)}`);
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
