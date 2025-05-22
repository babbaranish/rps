const rpsGame = () => {
  let playerScore = 0;
  let compScore = 0;

  // Cache DOM elements
  const introScreen = document.querySelector(".intro");
  const matchScreen = document.querySelector(".match");
  const gameOverScreen = document.querySelector(".game-over");
  const playBtn = document.querySelector(".intro button");
  const optionsBtns = document.querySelectorAll(".options button");
  const playerHandImg = document.querySelector(".player-hand");
  const compHandImg = document.querySelector(".computer-hand");
  const handsImgs = document.querySelectorAll(".hands img");
  const winnerText = document.querySelector(".winner");
  const playerScoreDisplay = document.querySelector(".player-score p");
  const compScoreDisplay = document.querySelector(".computer-score p");
  const playAgainBtn = document.querySelector(".game-over button");
  const themeSelect = document.getElementById('theme-select'); // Cache theme selector


  // Theme switching logic
  const applyTheme = (themeName) => {
    if (themeName === 'theme-default') {
      document.body.className = '';
    } else {
      document.body.className = themeName;
    }
    localStorage.setItem('selectedTheme', themeName);
  };

  if (themeSelect) { // Ensure themeSelect exists before adding listener or setting value
    themeSelect.addEventListener('change', (event) => {
      applyTheme(event.target.value);
    });

    // Load and apply saved theme on initialization
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      applyTheme(savedTheme);
      themeSelect.value = savedTheme;
    } else {
      applyTheme('theme-default'); // Apply default if no theme is saved
    }
  }


  const disableOptionsButtons = () => {
    optionsBtns.forEach(btn => btn.disabled = true);
  };

  const enableOptionsButtons = () => {
    optionsBtns.forEach(btn => btn.disabled = false);
  };

  // Logic from former 'start' function, now directly in rpsGame scope
  playBtn.addEventListener("click", () => {
    introScreen.classList.add("fadeOut");
    matchScreen.classList.add("fadeIn");
    matchScreen.classList.remove("fadeOut"); // Ensure match screen is not stuck in fadeOut
    // Also ensure introScreen is not immediately re-fading in if playAgain was clicked rapidly
    introScreen.classList.remove("fadeIn"); 
    enableOptionsButtons(); // Enable option buttons when match starts
  });

  const playMatch = () => {
    handsImgs.forEach(hand => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    optionsBtns.forEach(option => {
      option.addEventListener("click", function () {
        disableOptionsButtons(); // Disable buttons immediately on click

        //Computer Choice
        const compNum = Math.floor(Math.random() * 3);
        const compChoice = computerOptions[compNum];

        setTimeout(() => {
          compareHand(this.textContent, compChoice);
          playerHandImg.src = `./assets/${this.textContent}.png`;
          compHandImg.src = `./assets/${compChoice}.png`;

          // Re-enable buttons only if the game is not over
          if (playerScore < 4 && compScore < 4) {
            enableOptionsButtons();
          }
        }, 1000);

        playerHandImg.style.animation = "shakePlayer   1s ease";
        compHandImg.style.animation = "shakeComputer 1s ease";
      });
    });
  };

  const handleRoundResult = (playerWins, isTie) => {
    if (isTie) {
      winnerText.textContent = "It's a Tie";
    } else if (playerWins) {
      winnerText.textContent = "Player wins";
      playerScore++;
    } else {
      winnerText.textContent = "Computer wins";
      compScore++;
    }
    updateCounter();
    gameover(); // gameover will check if buttons should remain disabled due to game end
  };

  const compareHand = (pChoice, compChoice) => {
    if (pChoice === compChoice) {
      handleRoundResult(false, true);
      return;
    }

    if (pChoice === "rock") {
      if (compChoice === "scissors") {
        handleRoundResult(true, false);
      } else {
        handleRoundResult(false, false);
      }
      return;
    }

    if (pChoice === "paper") {
      if (compChoice === "rock") {
        handleRoundResult(true, false);
      } else {
        handleRoundResult(false, false);
      }
      return;
    }

    if (pChoice === "scissors") {
      if (compChoice === "paper") {
        handleRoundResult(true, false);
      } else {
        handleRoundResult(false, false);
      }
      return;
    }
  };

  const updateCounter = () => {
    playerScoreDisplay.textContent = playerScore;
    compScoreDisplay.textContent = compScore;
  };
  const gameover = () => {
    if (playerScore === 4 || compScore === 4) { // Use === for strict equality
      matchScreen.classList.remove("fadeIn");
      matchScreen.classList.add("fadeOut");
      gameOverScreen.classList.remove("fadeOut");
      gameOverScreen.classList.add("fadeIn");
      // Buttons are already disabled by playMatch.
      // They will be re-enabled by reset() if "Play Again" is clicked.
    }
  };

  const reset = () => {
    setTimeout(() => {
      playerScore = 0;
      compScore = 0;
      playerScoreDisplay.textContent = 0;
      compScoreDisplay.textContent = 0;
      winnerText.textContent = "Choose an option";
      enableOptionsButtons(); // Enable buttons for the new game
    }, 500);
  };

  // It's good practice to set up event listeners once.
  playAgainBtn.addEventListener("click", () => {
    gameOverScreen.classList.remove("fadeIn");
    gameOverScreen.classList.add("fadeOut");
    introScreen.classList.add("fadeIn");
    matchScreen.classList.remove("fadeIn"); // Hide match screen
    matchScreen.classList.remove("fadeOut"); // Ensure it's not stuck in fadeOut
    reset();
  });

  // Call playMatch to set up game logic (event listeners for options)
  // The initial screen transition is now handled by the playBtn listener above.
  playMatch();

};
rpsGame();
