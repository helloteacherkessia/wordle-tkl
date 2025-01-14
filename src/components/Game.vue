<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import Keyboard from './Keyboard.vue'
import { LetterState } from '../common/types'
import { WordService } from '../services/word.service'
import { GameService } from '../services/game.service'
import GameMessage from './GameMessage.vue'
import Navbar from './Navbar.vue'

let currentGameState = GameService.getGame();
const { word: answer } = GameService.getAnswerAndHint();
const board = ref(
  Array.from({ length: 6 }, () =>
    Array.from({ length: answer.length }, () => ({
      letter: '',
      state: LetterState.INITIAL
    }))
  )
)

let currentRowIndex = ref(0)
const currentRow = computed(() => {
  return board.value[currentRowIndex.value]
})

let message = ref('')
let grid = ref('')
let shakeRowIndex = ref(-1)
let success = ref(false)

const letterStates = ref<Record<string, LetterState>>({})

let allowInput = true

const onKeyup = (e: KeyboardEvent) => onKey(e.key)

window.addEventListener('keyup', onKeyup)

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup)
})

function onKey(key: string) {
  console.log("OnKey pressed", key)
  if (!allowInput) return
  if (/^[a-zA-Z]$/.test(key)) {
    fillTile(key.toLowerCase())
  } else if (key === 'Backspace') {
    clearTile()
  } else if (key === 'Enter') {
    completeRow()
  }
}

function fillTile(letter: string) {
  for (const tile of currentRow.value) {
    if (!tile.letter) {
      tile.letter = letter
      break
    }
  }
}

function clearTile() {
  for (const tile of [...currentRow.value].reverse()) {
    if (tile.letter) {
      tile.letter = ''
      break
    }
  }
}



async function completeRow(fromInitialState = false) {
  if (!currentRow.value.every((tile) => tile.letter)) {
    shake()
    showMessage('Not enough letters')
    return;
  }
  const guess = currentRow.value.map((tile) => tile.letter).join('')
  allowInput = false
  const word = await WordService.inWordList(guess); 
  allowInput = true
  if (!word.inWordList) {
    shake()
    showMessage(`Not in word list`)
    return
  }

  const answerLetters: (string | null)[] = answer.split('')
  currentRow.value.forEach((tile, i) => {
    if (answerLetters[i] === tile.letter) {
      tile.state = letterStates.value[tile.letter] = LetterState.CORRECT
      answerLetters[i] = null
    }
  })

  currentRow.value.forEach((tile) => {
    if (!tile.state && answerLetters.includes(tile.letter)) {
      tile.state = LetterState.PRESENT
      answerLetters[answerLetters.indexOf(tile.letter)] = null
      if (!letterStates.value[tile.letter]) {
        letterStates.value[tile.letter] = LetterState.PRESENT
      }
    }
  })

  currentRow.value.forEach((tile) => {
    if (!tile.state) {
      tile.state = LetterState.ABSENT
      if (!letterStates.value[tile.letter]) {
        letterStates.value[tile.letter] = LetterState.ABSENT
      }
    }
  })

  allowInput = false
  if(!fromInitialState) {
    GameService.updateGameGuess(guess);
  }
  if (currentRow.value.every((tile) => tile.state === LetterState.CORRECT)) {
    setTimeout(() => {
      if (!GameService.getGame().winState.isGameEnded) {
        GameService.finish(currentRowIndex.value)
      }
      grid.value = genResultGrid()
      showMessage("You won: " + answer.toUpperCase(), -1)
      success.value = true
    }, 1600)
  } else if (currentRowIndex.value < board.value.length - 1) {
    // go the next row
    currentRowIndex.value += 1
    setTimeout(() => {
      allowInput = true
    }, 1600)
  } else {
    // game over :(
    setTimeout(() => {
      if (!GameService.getGame().winState.isGameEnded) {
        GameService.finish()
      }
      showMessage("You lost 🥲🥲 : " + answer.toUpperCase(), -1)
    }, 1600)
  }
  
}

function showMessage(msg: string, time = 1000) {
  message.value = msg
  if (time > 0) {
    setTimeout(() => {
      message.value = ''
    }, time)
  }
}

function shake() {
  shakeRowIndex.value = currentRowIndex.value
  setTimeout(() => {
    shakeRowIndex.value = -1
  }, 1000)
}

const icons = {
  [LetterState.CORRECT]: '🟩',
  [LetterState.PRESENT]: '🟨',
  [LetterState.ABSENT]: '⬜',
  [LetterState.INITIAL]: null
}

function genResultGrid() {
  return board.value
    .slice(0, currentRowIndex.value + 1)
    .map((row) => {
      return row.map((tile) => icons[tile.state]).join('')
    })
    .join('\n')
}

for (const [index, guess] of currentGameState.guesses.entries()) {
  for (const [letterIndex, letter] of [...guess].entries()) {
    board.value[index][letterIndex].letter = letter
  }
  completeRow(true)
} 

</script>

<template>
  <Transition>
    <GameMessage :message="message" :grid="grid" :game-ended="() => GameService.getGame().winState.isGameEnded"/>
  </Transition>
  <Navbar />
  <div class="game-board">
  <div id="board">
    <div
      v-for="(row, index) in board"
      :class="[
        'row',
        shakeRowIndex === index && 'shake',
        success && currentRowIndex === index && 'jump'
      ]"
    >
      <div
        v-for="(tile, index) in row"
        :class="['tile', tile.letter && 'filled', tile.state && 'revealed']"
      >
        <div class="front" :style="{ transitionDelay: `${index * 300}ms` }">
          {{ tile.letter }}
        </div>
        <div
          :class="['back', tile.state]"
          :style="{
            transitionDelay: `${index * 300}ms`,
            animationDelay: `${index * 100}ms`
          }"
        >
          {{ tile.letter }}
        </div>
      </div>
    </div>
  </div>
  <Keyboard @key="onKey" :letter-states="letterStates" />
</div>
</template>

<style scoped>
#board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  --height: min(420px, calc(var(--vh, 100vh) - 310px));
  height: var(--height);
  width: min(350px, calc(var(--height) / 6 * v-bind('answer.length')));
  margin: 0px auto;
}
.message {
  position: absolute;
  left: 50%;
  top: 80px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.85);
  padding: 16px 20px;
  z-index: 2;
  border-radius: 4px;
  transform: translateX(-50%);
  transition: opacity 0.3s ease-out;
  font-weight: 600;
  width: max-content;
}
.message.v-leave-to {
  opacity: 0;
}
.row {
  display: grid;
  grid-template-columns: repeat(v-bind('answer.length'), 1fr);
  grid-gap: 5px;
}
.tile {
  width: 100%;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  text-transform: uppercase;
  user-select: none;
  position: relative;
}
.tile.filled {
  animation: zoom 0.2s;
}
.tile .front,
.tile .back {
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.tile .front {
  border: 2px solid #d3d6da;
}
.tile.filled .front {
  border-color: #999;
}
.tile .back {
  transform: rotateX(180deg);
}
.tile.revealed .front {
  transform: rotateX(180deg);
}
.tile.revealed .back {
  transform: rotateX(0deg);
}

@keyframes zoom {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translate(1px);
  }
  10% {
    transform: translate(-2px);
  }
  20% {
    transform: translate(2px);
  }
  30% {
    transform: translate(-2px);
  }
  40% {
    transform: translate(2px);
  }
  50% {
    transform: translate(-2px);
  }
  60% {
    transform: translate(2px);
  }
  70% {
    transform: translate(-2px);
  }
  80% {
    transform: translate(2px);
  }
  90% {
    transform: translate(-2px);
  }
  100% {
    transform: translate(1px);
  }
}

.jump .tile .back {
  animation: jump 0.5s;
}

@keyframes jump {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(-25px);
  }
  90% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media (max-height: 680px) {
  .tile {
    font-size: 3vh;
  }
}
</style>
