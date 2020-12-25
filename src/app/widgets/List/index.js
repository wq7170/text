import React from 'react';
import { inject, observer } from 'mobx-react';
import { SwipeAction, List } from 'antd-mobile';
import dayjs from 'dayjs';
import s from './index.module.scss';

@inject('store')
@observer
class NoteList extends React.Component {
    store = this.props.store;

    onCreateNote = () => {
        this.store.onCreateNote();
    }

    onDeleteNote = (id) => {
        this.store.onDeleteNote(id);
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
                                    onOpen={() => console.log('global open')}
                                >
                                    <List.Item
                                        onClick={e => console.log(e)}
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