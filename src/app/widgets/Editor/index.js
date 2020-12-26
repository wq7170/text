import React from 'react';
import { inject, observer } from 'mobx-react';
import BaseComponent from '../../common/BaseComponent';
import EditorCore from '../EditorCore';
import s from './index.module.scss';

@inject('store')
@observer
class Editor extends BaseComponent {

    onNoteClose = () => {
        this.store.onCloseEditor();
        this.store.targetNote.refreshContent();
        const content = this.store.targetNote.toJson();
        localStorage.setItem(this.store.targetNote.id, JSON.stringify(content));
    }

    render() {
        return (
            <div>
                <div className={s.top}>
                    <div className={s.fixWrap}>
                        <div className={s.close} onClick={this.onNoteClose}>关闭</div>
                    </div>
                </div>
                <div>
                    <EditorCore />
                </div>
            </div>
        )
    }
}

export default Editor;