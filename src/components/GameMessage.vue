<script setup lang="ts">
import { GameService } from '../services/game.service';


const { grid } = defineProps<{
    message: string;
    grid: string;
    gameEnded?: () => boolean;
}>()

const game = GameService.getGame()

const playAudio = (index: number) => {
    const audio = document.getElementById(`audio${index}`)! as HTMLAudioElement;
    audio.play()
}

const isShareEnabled = !!window.navigator.share;
function shareText() {
    return `Wordle TKL |  Day ${game.date} | \n\n${grid}\n\n`
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

    alert("Copied to the clipboard")
}
</script>

<template>
    <div class="message" v-if="message">
        {{ message }}
        <div class="flex flex-col" v-if="game.winState.isGameEnded || gameEnded?.()">
            <button @click="copyResults()">Copy to clipboard 📋</button>
            <button v-if="isShareEnabled" @click="shareResults()">Share 🔗</button>
            
            <template v-for="[wordIndex, message] in GameService.getGuessesWithMetadata().entries()">
                <div>
                    <p style="margin: 0; margin-top: 5%;"> Guess: {{ message.word.toUpperCase() }}</p>
                    <small v-if="message.phonetic">Phonetic: <i>{{ message.phonetic }}</i></small>
                    <div v-if="message.audio">
                        <button @click="playAudio(wordIndex)">Click to listen "{{  message.word }}"" 🔊</button>
                        <audio :id="`audio${wordIndex}`" controls style="display: none;">
                            <source :src="message.audio">
                        </audio>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.message {
    font-size: 200%;
}
</style>
