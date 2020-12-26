import React from 'react';
import { inject, observer } from 'mobx-react';
import List from './widgets/List';
import Editor from './widgets/Editor';
import Store from './store';
import s from './index.module.scss';

@inject('store')
@observer
class App extends React.Component {
    componentWillUnmount() {
        this.store.destory();
    }

    render() {
        const { showEditor } = this.props.store;
        return (
            <div className={s.app}>
                {showEditor ? <Editor /> : <List />}
            </div>
        );
    }
}

export default App;
