# Memory Cards Game

This project is based on an existing static memory game. I updated the code to pull images from APIs instead of using static files.

## What I Updated
- **Refactoring:** Turning the game from static card data to asynchronous API data fetching.
- **Dynamic Rendering:** Implemented a template-based system to generate cards for different themes.
- **Logic Adaptation:** Adjusted game logic to handle API data fetching and switch between different game themes.

## Features 
- **Dynamic Themes:** Play with dogs, Harry Potter characters, or Country flags.
- **API Integration:** Real-time image fetching from public APIs.
- **Responsive Design:** Works on different screen sizes.

## Tech Stack 
- **Languages:** JavaScript, HTML, CSS.
- **APIs Used:**
  - [Dog CEO API](https://dog.ceo/dog-api/) - For dog images.
  - [Harry Potter API](https://hp-api.onrender.com/) - For Harry Potter characters.
  - [Rest countries API](https://restcountries.com/) - For country flags.

## How to Play 
1. Clone the repository.
2. Open `index.html` in your browser.
3. Select a theme from the menu.
4. Flip the cards to find matching pairs.
5. Use the "Back to menu" button to return to the main screen and choose another theme to play.

## Installation 
No server setup is required. Simply download the files and open `index.html` in your browser.

---
*Created by Dina Kropilev*