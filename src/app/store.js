import { observable, action } from 'mobx';

export default class Store {
    @observable noteList = [];
    @observable showEditor = false;

    @action.bound
    onCreateNote() {
        this.noteList = this.noteList.concat({
            id: Date.now(),
            text: '',
        })
    }

    @action.bound
    onDeleteNote(id) {
        this.noteList = this.noteList.filter(item => item.id !== id);
    }
}