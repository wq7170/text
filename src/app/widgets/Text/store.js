import { observable } from 'mobx';

export default class TextStore {

    constructor(rootStore, props = {}) {
        this.rootStore = rootStore;
        Object.assign(this, props);
    }

    id;                                 // 区块id
    activeOffsetEnd = 0;
    @observable text = '';

    insertText(text, offset) {
        this.activeOffsetEnd = offset + text.length;
        this.text = this.text.slice(0, offset) + text + this.text.slice(offset);
    }

    deleteText(start, num) {
        this.activeOffsetEnd = start - num;
        this.text = this.text.slice(0, this.activeOffsetEnd) + this.text.slice(start);
    }

    getText() {
        return this.text;
    }

    toJson() {
        return {
            id: this.id,
            text: this.text,
        };
    }
}