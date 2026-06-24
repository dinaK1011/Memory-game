const MAX_CARDS = 12;

const memoryCardSelector = '.memoryCard';
const flipClass = 'flip';

let lockBoard = false;
let hasFlippedCard = false;
let firstCard = null;
let secondCard = null;

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.querySelector('.memoryGame');
  const Themebtns = document.querySelectorAll('.gameThemeBtn');
  const themeBox = document.querySelector('.chooseThemeBox div');

  themeBox.addEventListener('click', (e) => {
    const clickedButton = e.target.closest('.gameThemeBtn');
    if (!clickedButton) return;
    const selectedTheme = clickedButton.getAttribute('data-theme');
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
      const response = await fetch('https://opencountries.netlify.app/api/v1/countries');
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

const initGame = () => {
  matchedCards = 0;
  [firstCard, secondCard] = [null, null];
}