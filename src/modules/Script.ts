import AppScene from "./AppScene";

class Script<T> {
    appScene: AppScene;
    entity: T;
    initial!: (...args: any[]) => void;
    update!: (...args: any[]) => void;
    constructor(appScene: AppScene, entity: T) {
        this.entity = entity;
        this.appScene = appScene;
    }
}

export default Script;