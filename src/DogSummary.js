import React from 'react';

const DogSummary = ({ summary }) => {
  return (
    <ul className="dog-summary">
      {Object.keys(summary).map((name, idx) => (
        <li className="dog-summary--item" key={idx}>
          <p className="dog-summary--name">{name}</p>
          <p className="dog-summary--likeCount">Likes: {summary[name].likeCount}</p>
          <p className="dog-summary--imageCount">Images: {summary[name].imageCount}</p>
        </li>
      ))}
    </ul>
  );
}

export default DogSummary;
