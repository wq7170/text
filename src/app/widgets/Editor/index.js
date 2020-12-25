import React from 'react';
import { inject, observer } from 'mobx-react';
import s from './index.module.scss';

@inject('store')
@observer
class Editor extends React.Component {

    render() {
        return (
            <div>
                我这里是编辑页面
            </div>
        )
    }
}

export default Editor;