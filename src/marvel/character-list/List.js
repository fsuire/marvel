import React from 'react';

import Item from './Item';

const List = props => {
  const characters = props.characters
    .map(character => (<Item
      key={character.id}
      character={character}
      handleNavigate={props.handleNavigate}>
    </Item>));
  return (
    <div className="character-list">
      <ul>
        {characters}
      </ul>
    </div>
  );
};

export default List;
