import { LocalStorage } from "../common/db";
import { SavedGame, SavedGameModel, WordMetadata } from "../common/models";
import { getWordOfTheDay } from "../common/words";
import { DataService } from "./data.service";
import { WordService } from "./word.service";

export class GameService {
    static getGame() {
        const gameRepository = new LocalStorage(new SavedGame());
        let currentGame = gameRepository.findOrInitialize();
        const [currentDate] = new Date().toISOString().split('T'); 
        if (currentGame.date !== currentDate) {
            currentGame = gameRepository.initialize();
        }

        return currentGame;
    }

    static getAnswerAndHint() {
        return getWordOfTheDay()
    }
    
    static update(game: SavedGameModel) {
        const gameRepository = new LocalStorage(new SavedGame());
        gameRepository.replace(game);
    }

    static updateGameGuess(guess: string) {
        const game = GameService.getGame();
        game.guesses.push(guess);
        GameService.update(game);
    }

    static getGuessesWithMetadata(): WordMetadata[] {
        const game = GameService.getGame();
        const dictionary = WordService.getDictionary();

        const guessesMetadata: WordMetadata[] = [];
        for (const guess of game.guesses) {
            const foundMetadata = dictionary.find( ({word}) => word == guess);
            if (foundMetadata) {
                guessesMetadata.push(foundMetadata);
            }
        }
        return guessesMetadata;
    }

    static updateHintUsage() {
        const game = GameService.getGame();
        if (!game.hintUsed && !game.winState.isGameEnded) {
            game.hintUsed = true;
            GameService.update(game);
            DataService.incrementHintUsage()
        }
        return getWordOfTheDay().hint
    }

    static finish(attempt?: number) {
        const game = GameService.getGame();
        game.winState.isGameEnded = true;
        GameService.update(game);
        if (typeof attempt == "undefined") {
            return DataService.gameLost()
        }

        DataService.gameWon(attempt)
    }
}