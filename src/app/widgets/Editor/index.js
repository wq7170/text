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