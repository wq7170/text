import { action, observable } from 'mobx';
import { nanoid } from '../../../utils/nanoid';
import TextStore from '../Text/store';
import Range from '../../common/Range';
import Rnage from '../../common/Range';

export default class NoteStore {
    constructor(rootStore, props) {
        this.rootStore = rootStore;
        const {
            id,
            noteInfo = [],
        } = props;
        this.noteId = id;
        if (!noteInfo.length) {
            this.nodes = [new TextStore(this, {
                id: nanoid(),
                text: '',
            })]
        } else {
            this.nodes = noteInfo.map((item) => new TextStore(this, item));
        }
        this.curActiveNode = this.nodes[0];
        this.refreshContent();
    }

    noteId;
    isCollapsed = true;
    startRange = new Range();
    endRange = new Rnage();
    curActiveNode;
    @observable content = '';
    @observable nodes = [];

    @action.bound
    refreshContent() {
        this.content = this.getContent();
    }

    @action.bound
    onInsertBlock(preId, text = '') {
        const preIdx = this.findTargetNodeIdxById(preId);
        const node = new TextStore(this, {
            id: nanoid(),
            text,
        });
        this.nodes.splice(preIdx + 1, 0, node);
        this.nodes = this.nodes;
        this.curActiveNode = node;
        return node;
    }

    @action.bound
    onDeleteBlock(id) {
        const curIdx = this.findTargetNodeIdxById(id);
        if (curIdx === 0) {
            this.curActiveNode = this.nodes[curIdx];
        } else {
            this.nodes.splice(curIdx, 1);
            this.nodes = this.nodes;
            this.curActiveNode = this.nodes[curIdx - 1];
        }
        return this.curActiveNode;
    }

    findTargetNodeIdxById(id) {
        return this.nodes.findIndex((item) => item.id === id)
    }

    getContent() {
        return this.nodes.reduce((final, item) => (final + item.getText()), '');
    }

    toJson() {
        return {
            id: this.noteId,
            noteInfo: this.nodes.map(store => store.toJson()),
        };
    }
}