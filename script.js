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
  });
});
