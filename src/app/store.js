import { observable, action, reaction, runInAction } from 'mobx';
import NoteStore from './widgets/EditorCore/store';
import { getPageListIds, getPageInfoById, savePageList, savaPageInfo } from '../utils/request';

export default class Store {

    @observable.ref noteList = [];
    @observable showEditor = false;
    @observable targetNote = null;

    @action.bound
    async initStore() {
        const noteIds = await getPageListIds();
        const res = await Promise.all(noteIds.map((id) => getPageInfoById(id)));
        runInAction(() => {
            try {
                this.noteList = res.map(item => new NoteStore(this, item));
            } catch {
                this.noteList = [];
            }
        });

        this.autoSaveReaction = reaction(() => this.noteList.length, () => {
            savePageList(this.noteList.map(item => item.noteId));
        });
    }
    

    destory() {
        this.autoSaveReaction();
    }

    @action.bound
    onCreateNote() {
        const noteStore = new NoteStore(this, {
            id: Date.now(),
            noteInfo: [],
        });
        savaPageInfo(noteStore.noteId, noteStore.toJson());
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