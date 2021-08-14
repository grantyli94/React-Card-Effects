import React from 'react';

/** Card: Displays each Card component as an image.
 * 
 *  image: URL
 * 
 *  CardArea --> Card
 */
function Card( { image }) {
  return (
    <img src = { image } alt="card" />
  );
}

export default Card;