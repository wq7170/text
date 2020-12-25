import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'antd-mobile';
import BaseComponent from '../../common/BaseComponent';
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
                    我这里是编辑页
                </div>
            </div>
        )
    }
}

export default Editor;