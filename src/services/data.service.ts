import { LocalStorage } from "../common/db";
import { DataGame, DataModel } from "../common/models";

export class DataService {
    static getData() {
        const dataRepository = new LocalStorage(new DataGame());
        return dataRepository.findOrInitialize();
    }

    static gameWon(attempt: number) {
        const data = DataService.getData();
        data.streak += 1;
        const attemps = Object.keys(data.ammount);
        data.ammount[attemps[attempt] as keyof DataModel['ammount']] += 1

        DataService.updateData(data)
    }

    static gameLost() {
        const data = DataService.getData();
        data.streak += 0;
        data.ammount.lost += 1

        DataService.updateData(data)
    }

    static updateData(data: DataModel) {
        const dataRepository = new LocalStorage(new DataGame());
        dataRepository.replace(data)
    }

    static incrementHintUsage() {
        const data = DataService.getData();
        data.hintsUsed += 1

        DataService.updateData(data);
    }
}