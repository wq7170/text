import React from 'react';
import { inject, observer } from 'mobx-react';
import { SwipeAction, List } from 'antd-mobile';
import dayjs from 'dayjs';
import BaseComponent from '../../common/BaseComponent';
import s from './index.module.scss';

@inject('store')
@observer
class NoteList extends BaseComponent {

    onCreateNote = () => {
        this.store.onCreateNote();
    }

    onDeleteNote = (id) => {
        this.store.onDeleteNote(id);
    }

    onItemClick(item) {
        this.store.onShowEditor(item);
    }

    render() {
        const { noteList } = this.store;

        return (
            <div>
                <List>
                    {
                        noteList.map((item, idx) => {
                            const { id, text } = item;
                            return (
                                <SwipeAction
                                    key={`${id}_${idx}`}
                                    style={{ backgroundColor: 'gray' }}
                                    autoClose
                                    right={[
                                        {
                                            text: '删除',
                                            onPress: () => this.onDeleteNote(id),
                                            style: { backgroundColor: '#F4333C', color: 'white' },
                                        },
                                    ]}
                                    onOpen={this.onItemClick.bind(this, item)}
                                >
                                    <List.Item
                                        onClick={this.onItemClick.bind(this, item)}
                                    >
                                        <div className={s.item}>
                                            <div className={s.title}>{text || '新建文本'}</div>
                                            <div className={s.time}>{dayjs(id).format('YYYY-MM-DD HH:mm:ss')}</div>
                                        </div>
                                    </List.Item>
                                </SwipeAction>
                            );
                        })
                    }
                </List>
                <div className={s.create} onClick={this.onCreateNote}>新增</div>
            </div>
        );
    }
    
}

export default NoteList;