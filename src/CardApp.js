import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
const BASE_URL = "http://deckofcardsapi.com/api/deck";


function CardApp() {
  // get a brand new shuffled deck from the API
  // store that deck ID, remaining # of car in the CardApp state
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]); // ["https://", ... ]
  
  useEffect(function getNewDeckOnMount() {
    async function getNewDeck() {
      const newDeck = await axios.get(`${BASE_URL}/new/shuffle`);
      setDeck({deck_id: newDeck.deck_id, remaining: newDeck.remaining});
    }
    getNewDeck();
  }, []);

  function handleClick() {
    async function getCard() {
      const newCard = await axios.get(`${BASE_URL}/${deck.deck_id}/draw`);
      setDeck({...deck, remaining: newCard.remaining});
      setCards(cards.push(newCard.cards.image));
    }
    getCard();
  }

  function renderCard() {
    return <Card />
  }

  return (
    <div>
      <button onClick={handleClick}>Gimme a card!</button>
      <div className="Cards">

      </div>
      {renderCard()}
    </div>
  )
}

export default CardApp