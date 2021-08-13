import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import CardArea from './CardArea';
const BASE_URL = "http://deckofcardsapi.com/api/deck";

/** CardApp: Gets a new deck from the Deck of Cards API.
 *  deck contains the deck ID and number of remaining cards
 *  cards contains the image URL of each card in the deck as an 
 *  array.
 */
function CardApp() {
  // get a brand new shuffled deck from the API
  // store that deck ID, remaining # of car in the CardApp state
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]); // ["https://", ... ]

  useEffect(function getNewDeckOnMount() {
    async function getNewDeck() {
      const newDeck = await axios.get(`${BASE_URL}/new/shuffle`);

      const { deck_id, remaining } = newDeck.data;
      setDeck({ deck_id, remaining });
    }
    getNewDeck();
  }, []);

  /**
   *  handleClick: Gets a new card from the Deck of Cards API
   *  upon a click, and adds it to the cards array. If there are 
   *  no cards left, displays an error message.
   */
  function handleClick() {
    if (deck.remaining === 0) {
      alert("Error: no cards remaining!");
    }
    else {
      async function getCard() {
        const newCard = await axios.get(`${BASE_URL}/${deck.deck_id}/draw`);

        // TODO: could use the card type ('Queen of Hearts' as the ID instead of UUID)
        let card = { image: newCard.data.cards[0].image, id: uuid() };
        setDeck(deck => ({ ...deck, remaining: newCard.data.remaining }));
        setCards(cards => [...cards, card]);
      }
      getCard();
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Gimme a card!</button>
      < CardArea cards={cards} />
    </div>
  )
}

export default CardApp;