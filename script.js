const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const keyboard = document.querySelector("[data-keyboard]")
const alertContainer = document.querySelector("[data-alert-container]")
const guessGrid = document.querySelector("[data-guess-grid]")
const offsetFromDate = new Date(2024, 9, 16)
const msOffset = Date.now() - offsetFromDate
const dayOffset = msOffset / 1000 / 60 / 60 / 24;
const day = Math.floor(dayOffset) + 1;
let targetWord = targetWords[day - 1]
const WORD_LENGTH = targetWord.length;
const MAX_ATTEMPTS = 6;

for (let i = 0; i < WORD_LENGTH * MAX_ATTEMPTS; i++) {
  const tile = document.createElement("div")
  tile.classList.add("tile");
  guessGrid.append(tile);
}

console.log(guessGrid)
guessGrid.style.gridTemplateColumns = `repeat(${WORD_LENGTH}, 4em)`;

if(!targetWord) {
  showAlert('New guesses under construction');
  localStorage.setItem("savedGame", JSON.stringify({}))
  stopInteraction();
} 
const guessEmoji = [];
const [currentDate] = new Date().toISOString().split('T'); 
startGame();

function startInteraction() {
  document.addEventListener("click", handleMouseClick)
  document.addEventListener("keydown", handleKeyPress)
}

function stopInteraction() {
  document.removeEventListener("click", handleMouseClick)
  document.removeEventListener("keydown", handleKeyPress)
}

function editMode() {
  stopInteraction()
  showAlert('Edit Mode')
  targetWord = ''
  document.addEventListener("keydown", handleEditions)
}

function handleEditions(e) {
    if(e.key.match(/[a-z]/) && e.key.length === 1) {
      targetWord+= e.key
    }

    if(e.key == ";") {
      if(targetWord.length < WORD_LENGTH) {
          return showAlert('Not enough letters: ' + targetWord.length);
      } else if (targetWord.length > WORD_LENGTH) {
          showAlert('Too many letters (' + targetWord.length + '). Restarting from zero. ' )
          editMode();
          return
      }

      document.removeEventListener("keydown", handleEditions)
      showAlert('New word saved')
      startInteraction()
    }
}

function handleMouseClick(e) {
  if (e.target.matches("[data-key]")) {
    pressKey(e.target.dataset.key)
    return
  }

  if (e.target.matches("[data-enter]")) {
    submitGuess()
    return
  }

  if (e.target.matches("[data-delete]")) {
    deleteKey()
    return
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    submitGuess()
    return
  }

  if (e.key === "Backspace" || e.key === "Delete") {
    deleteKey()
    return
  }

  // if (e.key === ";") {
  //   editMode()
  //   return
  // }

  if (e.key.match(/^[a-z]$/)) {
    pressKey(e.key)
    return
  }
}

function pressKey(key) {
  const activeTiles = getActiveTiles()
  if (activeTiles.length >= WORD_LENGTH) return
  const nextTile = guessGrid.querySelector(":not([data-letter])")
  nextTile.dataset.letter = key.toLowerCase()
  nextTile.textContent = key
  nextTile.dataset.state = "active"
}

function deleteKey() {
  const activeTiles = getActiveTiles()
  const lastTile = activeTiles[activeTiles.length - 1]
  if (lastTile == null) return
  lastTile.textContent = ""
  delete lastTile.dataset.state
  delete lastTile.dataset.letter
}

function submitGuess(retroactive = false) {
  const activeTiles = [...getActiveTiles()]
  if (activeTiles.length !== WORD_LENGTH) {
    showAlert("Not enough letters")
    shakeTiles(activeTiles)
    return
  }

  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter
  }, "")

  checkWordExists(guess, activeTiles, retroactive)
}

function checkWordExists(word, activeTiles, retroactive) {
  if (retroactive) {
    flipActiveTiles(activeTiles, word, false)

    return;
  }

  if (wordAlreadyGuessed(word)) {
    flipActiveTiles(activeTiles, word, true)

    return;
  }

  axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(({data}) => {
    if (!Array.isArray(data)) {
      showAlert("Not in word list")
      shakeTiles(activeTiles)
      return
    }

    flipActiveTiles(activeTiles, word, true);
    updateGuessMetadata(data)
  })
}
function wordAlreadyGuessed(guess) {
  const game = JSON.parse(localStorage.getItem("savedGame"))
  return game.guesses.includes(guess)
}

function metadataAlreadySetted(word) {
  const game = JSON.parse(localStorage.getItem("savedGame"))
  return game.guessesMetadata.map( m => m.word).includes(word)
}

function flipActiveTiles(activeTiles, word, update = false) {
  guessEmoji.push([])
  stopInteraction()
  activeTiles.forEach((...params) => flipTile(...params, word))

  if (update) {
    updateGuess(word)
  }
}

function flipTile(tile, index, array, guess) {
  const letter = tile.dataset.letter
  const key = keyboard.querySelector(`[data-key="${letter}"i]`)
  setTimeout(() => {
    tile.classList.add("flip")
  }, (index * FLIP_ANIMATION_DURATION) / 2)

  tile.addEventListener(
    "transitionend",
    () => {
      tile.classList.remove("flip")
      if (targetWord[index] === letter) {
        guessEmoji[guessEmoji.length -1].push('🟩')
        tile.dataset.state = "correct"
        key.classList.add("correct")
      } else if (targetWord.includes(letter)) {
        guessEmoji[guessEmoji.length -1].push('🟨')
        tile.dataset.state = "wrong-location"
        key.classList.add("wrong-location")
      } else {
        guessEmoji[guessEmoji.length -1].push('⬛')
        tile.dataset.state = "wrong"
        key.classList.add("wrong")
      }

      if (index === array.length - 1) {
        tile.addEventListener(
          "transitionend",
          () => {
            startInteraction()
            checkWinLose(guess, array)
          },
          { once: true }
        )
      }
    },
    { once: true }
  )
}

function getActiveTiles() {
  return guessGrid.querySelectorAll('[data-state="active"]')
}

function getNextFiveTiles() {
  return [...guessGrid.querySelectorAll('.tile:not([data-state="active"])')].slice(0,5)
}

function shareText() {
  return `Wordle TKL |  Day ${day} | \n\n${guessEmoji.map(line => line.join('')).join('\n')}\n\n`
}

function shareResults() {
  const sharePayload = {
    title: `Wordle TKL`,
    text: shareText(),
    url: window.location.href,
  };

  navigator.share(sharePayload);
}

function copyResults() {
  navigator.clipboard.writeText(shareText());

  showAlert("Copied to the clipboard")
}

function showAlert(message, duration = 1000, share = false) {
  const alert = document.createElement("div")
  alert.textContent = message
  alert.classList.add("alert")
  alertContainer.prepend(alert)
  let game = JSON.parse(localStorage.getItem("savedGame"));
  for(const metadata of game.guessesMetadata) {
    if (metadata.audio) {
      const audio = document.createElement("audio");
      const source = document.createElement("source");
      const span = document.createElement("span");
      audio.controls = true;
      source.src = metadata.audio;
      source.type = "audio/mpeg"
      span.innerHTML = `${metadata.word} <small><i>${metadata.phonetic}</i></small>`;
      span.style.marginTop = "3%";
      span.style.color= "black"
      audio.append(source);
      alert.append(span)
      alert.append(audio)
    }
  }

  if(share) {
      const shareButton = document.createElement("button");
      shareButton.innerText = "Share 🔗" 
      shareButton.addEventListener('click', shareResults);

      const copyButton = document.createElement("button");
      copyButton.innerText = "Or copy to clipboard 📋" 
      copyButton.addEventListener('click', copyResults);

      alert.append(shareButton);
      alert.append(copyButton)
  }

  if (duration == null) return

  setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", () => {
      alert.remove()
    })
  }, duration)
}

function shakeTiles(tiles) {
  tiles.forEach(tile => {
    tile.classList.add("shake")
    tile.addEventListener(
      "animationend",
      () => {
        tile.classList.remove("shake")
      },
      { once: true }
    )
  })
}

function checkWinLose(guess, tiles) {
  if (guess === targetWord) {
    endGame("win", () => {
      showAlert("You Win 🥳🥳 : "+ targetWord.toUpperCase(), null, true)
      danceTiles(tiles)
      stopInteraction()
    });
    return
  }

  const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
  if (remainingTiles.length === 0) {    
    endGame("lose", () => {
      showAlert("You lost 🥲🥲 : " + targetWord.toUpperCase(), null, true)
      stopInteraction()
    });
  }
}

function danceTiles(tiles) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("dance")
      tile.addEventListener(
        "animationend",
        () => {
          tile.classList.remove("dance")
        },
        { once: true }
      )
    }, (index * DANCE_ANIMATION_DURATION) / 5)
  })
}

function startGame() {
    console.log("Starting game")
    let game = localStorage.getItem("savedGame");
    if(!game) game = initGameStorage();
    game = JSON.parse(game);
    if(game?.date !== currentDate) game = initGameStorage();

    if(game?.guesses?.length) {
      populateStoragedGuesses(game.guesses)
    }

    startInteraction()
}

function initGameStorage() {
  localStorage.setItem("savedGame", JSON.stringify(
    { 
      date: currentDate, 
      guesses: [],
      guessesMetadata: [],
      wrongKeys: [], 
      winState: {
        isGameEnded: false,
        isGameWon: false,
      } 
    }
  ))


  return localStorage.getItem("savedGame")
}

function updateGuessMetadata(data, unshift = false) {
  const [wordInfo] = data;
  metadata = {
    word: wordInfo. word,
    phonetic: wordInfo.phonetic,
    audio: wordInfo.phonetics?.[0].audio,
  };
  const game = JSON.parse(localStorage.getItem("savedGame"))
  if (!unshift) {
    game.guessesMetadata.push(metadata)
  } else {
    game.guessesMetadata.unshift(metadata)
  }
  localStorage.setItem("savedGame", JSON.stringify(game));
}

function updateGuess(guess) {
  const game = JSON.parse(localStorage.getItem("savedGame"))
  game.guesses.push(guess)
  localStorage.setItem("savedGame", JSON.stringify(game));
}

function populateStoragedGuesses(guesses) {
  guesses.forEach(async (guess, index) => {
    await sleep((FLIP_ANIMATION_DURATION * 6 * index) / 2).then(() => {
      [...guess].forEach(key => pressKey(key))
      submitGuess(true)
    })
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function endGame(status, callback) {
  console.log("Finishing game")
  const winState = {
    isGameEnded: true,
    isGameWon: status === "win"
  }

  if (!winState.isGameWon && !metadataAlreadySetted(targetWord)) {
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${targetWord}`).then( ({data}) => {
      updateGuessMetadata(data, true);
      const game = JSON.parse(localStorage.getItem("savedGame"))
      game.winState = { ...winState }
      
      localStorage.setItem("savedGame", JSON.stringify(game))
      callback();
      
    });
  } else {
    const game = JSON.parse(localStorage.getItem("savedGame"))
    game.winState = { ...winState }
    
    localStorage.setItem("savedGame", JSON.stringify(game))
    callback();
  }
}

function isGameEnded() {
  const game = JSON.parse(localStorage.getItem("savedGame"))
  return game.winState.isGameEnded
}
