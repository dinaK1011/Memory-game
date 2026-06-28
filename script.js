const MAX_CARDS = 12;
const THEMES = ['dogs', 'harryPotter', 'flags'];

const memoryCardSelector = '.memoryCard';
const flipClass = 'flip';

let lockBoard = false;
let hasFlippedCard = false;
let firstCard = null;
let secondCard = null;
let matchedCards = 0;

const initGame = () => {
  matchedCards = 0;
  resetTurn();
};

document.addEventListener('DOMContentLoaded', () => {
  const gameDeck = document.querySelector('.memoryGame');
  const themeBox = document.querySelector('.chooseThemeBox div');

  gameDeck.addEventListener('click', (e) => {
    const isCardClicked = e.target.closest(memoryCardSelector);
    if(!isCardClicked || lockBoard || isCardClicked.classList.contains(flipClass)){
  return;
}
    flipCard(isCardClicked);
  });

  themeBox.addEventListener('click', (e) => {
    const isBtnClicked = e.target.closest('.gameThemeBtn');
    if(!isBtnClicked)
      return;
    const selectedTheme = isBtnClicked.getAttribute('data-theme');
    initGame();
    console.log(`You selected ${selectedTheme} theme`);
    fetchImgByTheme(selectedTheme);
  });
});

const fetchImgByTheme = async (choosenTheme) => {
  let images = [];
  if(choosenTheme === 'dogs'){
    try{
      const response = await fetch(`https://dog.ceo/api/breeds/image/random/${MAX_CARDS / 2}`);
      if(!response.ok) throw new Error('Failed at fetch dogs images');
      const data = await response.json();
      images = data.message.map((url, i) => ({ id: i, url }));
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
      images = data.slice(0, 6).map((char, i) => ({ id: i, url: char.image }));
    }
    catch(error){
      console.error('An error in Harry Potter API',error.message);
      return;
    }
  }
  if(choosenTheme === 'flags') {
    try {
      const response = await fetch('https://api.restcountries.com/countries/v5?limit=100', { 
        headers: { 'Authorization': 'Bearer rc_live_25c6b1137f4347edb30a60e0a8473ef0' } 
      });
      if(!response.ok) throw new Error('error fetching flags');
      const data = await response.json();
      const countries = data.objects || data.data.objects;
      if (countries) {
        images = countries
          .filter(c => c.flag && c.flag.url_png)
          .sort(() => Math.random() - 0.5)
          .slice(0, 6)
          .map((c, i) => ({ id: i, url: c.flag.url_png }));
      }
    }
    catch(error){
      console.error('An error in Country flags API', error.message); 
      return;
    }
  }
  if(choosenTheme === 'random'){

  }
  if (images.length === 0){
    return;
  }
  const duplicateCards = [...images, ...images];
  renderCards(shuffleArr(duplicateCards));
}

const shuffleArr = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
return arr;
};

const renderCards = (imgArr) => {
  const gameDeck = document.querySelector('.memoryGame');
  const template = document.getElementById('cardTemplate');
  gameDeck.innerHTML = '';
  imgArr.forEach((img, index) => {
    const cloneCard = template.content.cloneNode(true);
    const cardEl = cloneCard.querySelector('.memoryCard');
    cardEl.dataset.card = img.id;
    cardEl.dataset.index = index;
    cardEl.querySelector('.frontFace').src = img.url;
    gameDeck.appendChild(cloneCard);
  });
}

const flipCard = (cardEl) => {
  if(cardEl === firstCard){
    return;
  }
  cardEl.classList.add(flipClass);
  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = cardEl;
    return;
  }
  secondCard = cardEl;
  lockBoard = true;
  checkIFMatch();
}

const disableMatchedCards = () => {
  matchedCards ++;
  if(matchedCards === MAX_CARDS / 2){
    setTimeout(() => {
      alert('Congrats!! You win!');
    }, 500);
  }
  resetTurn();
};

const flipCardsBack = () => {
  lockBoard = true;
    setTimeout(() => {
      if(firstCard) firstCard.classList.remove(flipClass);
      if(secondCard) secondCard.classList.remove(flipClass);
      resetTurn();
    }, 1500);
  };

const checkIFMatch = () => {
  console.log('Comparing:', firstCard.dataset.card, 'with', secondCard.dataset.card);
  const isAMatch = firstCard.dataset.card === secondCard.dataset.card;
  isAMatch ? disableMatchedCards() : flipCardsBack();
};
const resetTurn = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  };