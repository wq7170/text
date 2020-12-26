import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { TextNodeType } from '../../../utils/nodeTypes';
import s from './index.module.scss';

const Text = (props) => {
    const { store } = props;
    const { id, text, activeOffsetEnd } = store;
    const nodeRef = useRef(null);

    useEffect(() => {
        if (nodeRef.current.firstChild) {
            const range = new Range();
            range.setStart(nodeRef.current.firstChild, activeOffsetEnd);
            range.setEnd(nodeRef.current.firstChild, activeOffsetEnd);
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(range);
        }
    }, [ text ])

    return (
        <div className={s.text} id={id} datatype={TextNodeType} ref={nodeRef}>
            {store.text}
        </div>
    );
}

export default observer(Text);

