import React from 'react';
import { useDispatch } from 'react-redux';
import { likeDog } from './dogSlice';

const DogList = ({ list }) => {
  const dispatch = useDispatch();

  // carrying function here to look neat when invoked later hehe
  const onLike = (name, id) => () => dispatch(likeDog({ name, id }));

  return (
    <ul className="dog-list">
      {list.map(({ id, name, image, likes }) => (
        <li className="dog-list--item" key={id} onClick={onLike(name, id)}>
          <img className="dog-list--item-image" src={image} alt={name} />
          <p className="dog-list--item-name">{name}</p>
          <p className="dog-list--item-likes">Likes: {likes}</p>
        </li>
      ))}
    </ul>
  );
}

export default DogList;
