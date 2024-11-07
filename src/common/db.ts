import { Model } from "./models";

export class LocalStorage<T = any>{
    constructor(private readonly model: Model<T>) {
    }
    private serializeJson(data: any): string {
        return JSON.stringify(data);
    }
    private parseJson(jsonString: string): ReturnType<Model<T>["initializer"]> {
        return JSON.parse(jsonString) as ReturnType<Model<T>["initializer"]>;
    }
    findOrInitialize(): ReturnType<Model<T>["initializer"]> {
        let stringValue = localStorage.getItem(this.model.key);
        if (!stringValue) {
            stringValue = this.serializeJson(this.initialize())
        }

        return this.parseJson(stringValue)
    }
    replace(data: ReturnType<Model<T>["initializer"]>): ReturnType<Model<T>["initializer"]> {
        localStorage.setItem(this.model.key, this.serializeJson(data));
        return data;
    }
    initialize(): ReturnType<Model<T>["initializer"]> {
        const init = this.model.initializer()
        localStorage.setItem(this.model.key, this.serializeJson(init))

        return init;
    }
}