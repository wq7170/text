import React from 'react';
import { Provider, observer } from 'mobx-react';
import List from './widgets/List';
import Editor from './widgets/Editor';
import Store from './store';
import s from './index.module.scss';

@observer
class App extends React.Component {
    constructor(props) {
        super(props);
        this.store = new Store();
    }

    render() {
        const { isEditor } = this.store;
        return (
            <Provider store={this.store}>
                <div className={s.app}>
                    {isEditor ? <Editor /> : <List />}
                </div>
            </Provider>
        );
    }
}

export default App;
