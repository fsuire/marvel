import React from 'react';

import './Detail.css';

const Detail = props => {
  const onClick = e => {
    const stateUpdate = {
      currentCharacter: null
    };
    props.handleNavigate(e, stateUpdate);
  };

  const character = props.character;
  const thumbnailUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  const description = character.description || "no description";
  const firstThreeComics = character.comics.items.slice(0, 3).map((comic, index) => (
    <li key={index}>{comic.name}</li>
  ));
  
  return (
    <div className="character-detail">
      <div onClick={onClick} className="flex-align-left clickable">Back to the list</div>
      <h2>{character.name}</h2>
      <img src={thumbnailUrl} alt={character.name}/>
      <p>{description}</p>
      <dl>
        <dt>Number of comics</dt>
        <dd>{character.comics.available}</dd>
          <dt>First three comics</dt>
          <dd>
            <ol>
              {firstThreeComics}
            </ol>
          </dd>
      </dl>
    </div>
  );
};

export default Detail;
