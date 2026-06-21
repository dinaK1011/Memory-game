const MAX_CARDS = 12;
const memoryCardSelector = ".memoryCard";
const flipClass = "flip";

let lockBoard = false;
let hasFlippedCard = false;

let firstCard = null;
let secondCard = null;

document.addEventListener("DOMContentLoaded", () => {
  const cardElList = document.querySelectorAll(memoryCardSelector);

  const shuffleCards = () => {
    cardElList.forEach((card) => {
      const randomOrder = Math.floor(Math.random() * MAX_CARDS);
      card.style.order = randomOrder;
    });
  };

  shuffleCards();

  const handleClickFlip = (e) => {
    const clickedCard = e.target.closest(memoryCardSelector);
    console.log(clickedCard);

    if (firstCard === clickedCard || lockBoard) {
      return;
    }

    clickedCard.classList.add(flipClass);

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = clickedCard;
      return;
    }

    secondCard = clickedCard;
    lockBoard = true;

    checkForMatch();
  };

  cardElList.forEach((card) => {
    card.addEventListener("click", handleClickFlip);
  });

  const checkForMatch = () => {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? disableMatchedCards() : flipCardsBack();
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
});
