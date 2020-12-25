import { observable, action, reaction, runInAction } from 'mobx';
import { StorageKey } from './constants';

export default class Store {

    constructor() {
        const ids = localStorage.getItem(StorageKey);
        if (ids) {
            try {
                runInAction(() => {
                    const noteIds = JSON.parse(ids);
                    noteIds.forEach(id => {
                        try {
                            this.noteList = this.noteList.concat(JSON.parse(localStorage.getItem(id)));
                        } catch {
                            console.log(`note id: ${id} init failed`);
                        }
                    })
                });
            } catch (e) {
                this.noteList = [];
            }
        }

        this.autoSaveReaction = reaction(() => this.noteList.length, () => {
            localStorage.setItem(StorageKey, JSON.stringify(this.noteList.map(item => item.id)));
        });
    }

    @observable noteList = [];
    @observable showEditor = false;
    @observable targetNote = null;
    

    destory() {
        this.autoSaveReaction();
    }

    @action.bound
    onCreateNote() {
        const note = {
            id: Date.now(),
            text: '',
        };
        localStorage.setItem(note.id, JSON.stringify(note));
        this.noteList = this.noteList.concat(note);
    }

    @action.bound
    onDeleteNote(id) {
        localStorage.removeItem(id);
        this.noteList = this.noteList.filter(item => item.id !== id);
    }

    @action.bound
    onShowEditor(note) {
        this.showEditor = true;
        this.targetNote = note;
    }

    @action.bound
    onCloseEditor() {
        this.showEditor = false;
    }
}