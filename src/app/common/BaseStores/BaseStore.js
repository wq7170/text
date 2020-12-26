export default class BaseStore {
    constructor(rootStore, props) {
        this.rootStore = rootStore;
        Object.assign(this, props);
    }
}