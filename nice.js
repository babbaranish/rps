const rps = () => {
  let playerScore = 0;
  let compScore = 0;
  const introScreen = document.querySelector(".match");


  const start = () => {
    const playBtn = document.querySelector(".intro button");
    const fadeScreen = document.querySelector(".intro");

    playBtn.addEventListener("click", () => {
      fadeScreen.classList.add("fadeOut");
      introScreen.classList.add("fadeIn");
      introScreen.classList.remove("fadeOut");

    });

  };

  const playMatch = () => {
    const btns = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const compHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");
    hands.forEach(hand => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    btns.forEach(option => {
      option.addEventListener("click", function () {
        //Computer Choice
        const compNum = Math.floor(Math.random() * 3);
        const compChoice = computerOptions[compNum];
        setTimeout(() => {
          compareHand(this.textContent, compChoice);
          playerHand.src = `./assets/${this.textContent}.png`;
          compHand.src = `./assets/${compChoice}.png`;
        }, 1000);

        playerHand.style.animation = "shakePlayer   1s ease";
        compHand.style.animation = "shakeComputer 1s ease";
      });
    });
  };

  const compareHand = (pChoice, compChoice) => {
    const winner = document.querySelector(".winner");
    if (pChoice === compChoice) {
      winner.textContent = "It's a Tie";
      return;
    }
    if (pChoice === "rock") {
      if (compChoice === "scissors") {
        winner.textContent = "Player wins";
        playerScore++;
        updateCounter();
        gameover();
        return;
      } else {
        winner.textContent = "Computer wins";
        compScore++;
        updateCounter();
        gameover();
        return;
      }
    }

    if (pChoice === "paper") {
      if (compChoice === "rock") {
        winner.textContent = "Player wins";
        playerScore++;
        updateCounter();
        gameover();
        return;
      } else {
        winner.textContent = "Computer wins";
        compScore++;
        updateCounter();
        gameover();
        return;
      }
    }

    if (pChoice === "scissors") {
      if (compChoice === "paper") {
        winner.textContent = "Player wins";
        playerScore++;
        updateCounter();
        gameover();
        return;
      } else {
        winner.textContent = "Computer wins";
        compScore++;
        updateCounter();
        gameover();
        return;
      }
    }
  };
  const updateCounter = () => {
    const playerCount = document.querySelector(".player-score p");
    const computerCount = document.querySelector(".computer-score p");
    playerCount.textContent = playerScore;
    computerCount.textContent = compScore;
  };
  const gameover = () => {
    const over = document.querySelector(".game-over");
    const playAgain = document.querySelector(".game-over button");
    if (playerScore == 5 || compScore == 5) {
      introScreen.classList.remove("fadeIn");
      introScreen.classList.add("fadeOut")
      over.classList.remove("fadeOut");
      over.classList.add("fadeIn");

    }
    playAgain.addEventListener("click", () => {
      over.classList.remove("fadeIn");
      over.classList.add("fadeOut");
      introScreen.classList.add("fadeIn");
      reset();
    });
  }
  const reset = () => {
    setTimeout(() => {
      const playerCount = document.querySelector(".player-score p");
      const computerCount = document.querySelector(".computer-score p");
      playerScore = 0;
      compScore = 0;
      playerCount.textContent = 0;
      computerCount.textContent = 0;

    }, .500)
  }

  start();
  playMatch();

};
rps();
