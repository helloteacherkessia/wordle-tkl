import axios from "axios";
import { WordMetadata } from "./models";

export async function requestApi(word: string): Promise<WordMetadata> {
    try {
        const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (Array.isArray(data) && data.length) {
            const [wordInfo] = data;
            return {
                inWordList: true,
                word: wordInfo. word,
                phonetic: wordInfo.phonetic,
                audio: wordInfo?.phonetics?.[0]?.audio,
            }
        }
    } catch (err) {
        console.error("Not a valid word")
    }

    return {
        inWordList: false,
        word: word,
        phonetic: undefined,
        audio: undefined,
    }
}