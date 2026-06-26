const MAX_CARDS = 12;

const memoryCardSelector = '.memoryCard';
const flipClass = 'flip';

let lockBoard = false;
let hasFlippedCard = false;
let firstCard = null;
let secondCard = null;

document.addEventListener('DOMContentLoaded', () => {
  const gameDeck = document.querySelector('.memoryGame');
  const Themebtns = document.querySelectorAll('.gameThemeBtn');
  const themeBox = document.querySelector('.chooseThemeBox div');

  gameDeck.addEventListener('click', (e) => {
    const isCardClicked = e.target.closest(memoryCardSelector);
    if(!isCardClicked || lockBoard || isCardClicked.classList.contains(flipClass))
      return console.log(`you clicked a card`);
    flipCard(isCardClicked);
  });

  themeBox.addEventListener('click', (e) => {
    const isBtnClicked = e.target.closest('.gameThemeBtn');
    if(!isBtnClicked)
      return;
    const selectedTheme = isBtnClicked.getAttribute('data-theme');
    console.log(`You selected ${selectedTheme} theme`);
    fetchImgByTheme(selectedTheme);
  });

});

const fetchImgByTheme = async (choosenTheme) => {
  let images = [];
  if(choosenTheme === 'dogs'){
    try{
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if(!response.ok) throw new Error('Failed at fetch dogs images');
      const data = await response.json();
      return data;
    }
    catch(error){
      console.error('An error in dogs API',error.message);
      return;
    }
  }
  if(choosenTheme === 'harryPotter'){
    try{
      const response = await fetch('https://hp-api.onrender.com/api/characters');
      if(!response.ok) throw new Error('Failed at fetch Harry Potter character images');
      const data = await response.json();
      return data;
    }
    catch(error){
      console.error('An error in Harry Potter API',error.message);
      return;
    }
  }
  if(choosenTheme === 'flags'){
    try{
      const response = await fetch('https://api.restcountries.com/countries/v5',
      { headers: { 'Authorization': `Bearer rc_live_25c6b1137f4347edb30a60e0a8473ef0` } });
      if(!response.ok) throw new Error('Failed at fetch Country flags images');
      const data = await response.json();
      const shuffledCountries = data.sort(() => 0.5 - Math.random()).slice(0, 6);
      return data;
    }
    catch(error){
      console.error('An error in Country flags API',error.message);
      return;
    }
  }
  if(choosenTheme === 'random'){

  }
};

const shuffleArr = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
return arr;
};


const initGame = () => {
  matchedCards = 0;
  [firstCard, secondCard] = [null, null];
};

const flipCard = (cardEl) => {
  if(cardEl === firstCard)
    cardEl.classList.add(flipClass);
    return;

  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = cardEl;
    return;
  }
  secondCard = cardEl;
  checkIFMatch();
};

const checkIFMatch = () => {
    const isAMatch = firstCard.dataset.card === secondCard.dataset.card;

    isAMatch ? disableMatchedCards() : flipCardsBack();
  };

  const disableMatchedCards = () => {
    firstCard.removeEventListener("click", handleClickFlip);
    secondCard.removeEventListener("click", handleClickFlip);
    resetTurn();
  };
  const flipCardsBack = () => {
    setTimeout(() => {
      firstCard.classList.remove(flipClass);
      secondCard.classList.remove(flipClass);
      resetTurn();
    }, 1500);
  };

const resetTurn = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  };