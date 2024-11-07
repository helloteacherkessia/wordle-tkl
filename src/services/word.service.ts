import { requestApi } from "../common/api";
import { LocalStorage } from "../common/db"
import { ApiWordsRequested, ApiWordsRequestedModel, InvalidWords, InvalidWordsModel, WordMetadata } from "../common/models"

export class WordService {
    static async inWordList(word: string): Promise<WordMetadata> {
        const invalidWords = WordService.getInvalidWordList();
        if (invalidWords.includes(word)) {
            return {
                inWordList: false,
                word,
            }
        }
        const existingDictionary = WordService.getDictionary().map( d => d.word);
        if (existingDictionary.includes(word)) {
            const existingWord = WordService.getDictionary().find( d => d.word === word )!
            return {
                ...existingWord,
                inWordList: true,
            }
        }

        const newWord = await requestApi(word);
        if (!newWord.inWordList) {
            WordService.updateInvalidWordList(word);
            return {
                inWordList: false,
                word,
            }
        }

        WordService.updateDictionary(newWord);
        return newWord;
    }
    static getInvalidWordList(): InvalidWordsModel {
        const invalidWordsRepository = new LocalStorage(new InvalidWords());
        return invalidWordsRepository.findOrInitialize();
    }

    static updateInvalidWordList(word: string): void {
        const invalidWordsRepository = new LocalStorage(new InvalidWords());
        const invalidWordList =  invalidWordsRepository.findOrInitialize();

        invalidWordsRepository.replace([...invalidWordList, word])
    }

    static getDictionary(): ApiWordsRequestedModel {
        const dictionaryRepository = new LocalStorage(new ApiWordsRequested());
        return dictionaryRepository.findOrInitialize();
    } 

    static updateDictionary(word: WordMetadata): void {
        const dictionaryRepository = new LocalStorage(new ApiWordsRequested());
        const dictionary =  dictionaryRepository.findOrInitialize();

        dictionaryRepository.replace([...dictionary, word])
    }
}