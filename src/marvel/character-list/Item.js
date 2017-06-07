import React from 'react';

import './Item.css';

const Item = props => {
  const onClick = e => {
    const stateUpdate = {
      currentCharacter: props.character
    };
    props.handleNavigate(e, stateUpdate);
  };

  const character = props.character;
  const thumbnailUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  return (<li className="character-list-item">
    <div className="thumbnail">
      <img src={thumbnailUrl} alt={character.name}/>
    </div>
    <p className="clickable" onClick={onClick}>{character.name}</p>
  </li>);
};

export default Item;
