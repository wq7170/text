import { observable, action, reaction, runInAction } from 'mobx';
import { StorageKey } from './constants';
import NoteStore from './widgets/EditorCore/store';

export default class Store {

    constructor() {
        const ids = localStorage.getItem(StorageKey);
        if (ids) {
            try {
                runInAction(() => {
                    const noteIds = JSON.parse(ids);
                    noteIds.forEach(id => {
                        try {
                            const noteStore = new NoteStore(this, JSON.parse(localStorage.getItem(id)));
                            this.noteList = this.noteList.concat(noteStore);
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

    @observable.ref noteList = [];
    @observable showEditor = false;
    @observable targetNote = null;
    

    destory() {
        this.autoSaveReaction();
    }

    @action.bound
    onCreateNote() {
        const noteStore = new NoteStore(this, {
            id: Date.now(),
            noteInfo: [],
        });
        localStorage.setItem(noteStore.id, JSON.stringify(noteStore.toJson()));
        this.noteList = this.noteList.concat(noteStore);
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