export type SavedGameModel = { 
    date: string; 
    guesses: string[];
    hintUsed: boolean;
    winState: {
        isGameEnded: boolean;
    } 
}
export type WordMetadata = {
    inWordList: boolean;
    word: string;
    phonetic?: string;
    audio?: string;
}

export type InvalidWordsModel = string[];

export type ApiWordsRequestedModel = WordMetadata[];

export type DataModel = {
    streak: number;
    ammount: {
        first: number;
        second: number;
        third: number;
        fourth: number;
        fifth: number;
        sixth: number;
        lost: number;
    };
    hintsUsed: number;
}

export interface Model<T=any> {
    key: string;
    initializer(): T
}

export class SavedGame implements Model<SavedGameModel> {
    public key: string = "savedGame"
    initializer(): SavedGameModel {
        const [currentDate] = new Date().toISOString().split('T'); 
        return {
            date: currentDate,
            guesses: [],
            hintUsed: false,
            winState: {
                isGameEnded: false,
            } 
        }
    }
}

export class InvalidWords implements Model<InvalidWordsModel> {
    public key: string = "apiErrors";
    initializer(): InvalidWordsModel {
        return []
    }
}

export class ApiWordsRequested implements Model<ApiWordsRequestedModel> {
    public key: string = "ApiWordsRequested";
    initializer(): ApiWordsRequestedModel {
        return []
    }
}

export class DataGame implements Model<DataModel> {
    public key: string = "data";
    initializer(): DataModel {
        return {
            streak: 0,
            ammount: {
                first: 0,
                second: 0,
                third: 0,
                fourth: 0,
                fifth: 0,
                sixth: 0,
                lost: 0,
            },
            hintsUsed: 0,
        }
    }
}