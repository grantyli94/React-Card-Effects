import Card from "./Card";
import React from "react";

/** CardArea: Displays a container holding each card in the
 *  array of cards, mapped to the Card component.
 * 
 *  cards: // TODO: complete this 
 */
function CardArea( {cards} ) {

  return (
    <div>
      {cards.map(card => < Card key={card.id} image={card.image}/>)}
    </div>
  );
}

export default CardArea;