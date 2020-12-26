import React from 'react';
import { inject, observer } from 'mobx-react';
import BaseComponent from '../../common/BaseComponent';
import Text from '../Text';
import { isRangeInNode, getRangeInfo } from '../../../utils/selection';
import { observable } from 'mobx';
import s from './index.module.scss';

@inject('store')
@observer
class EditorCore extends BaseComponent {
    noteStore = this.store.targetNote;
    editorRef = React.createRef();
    isCompositionStart = false;
    state = {
        activeBlockId: this.noteStore.nodes[0].id,
        toStart: true,
    }

    componentDidMount() {
        document.addEventListener('selectionchange', this.onSelectionChange);
        this.editorRef.current.addEventListener('textInput', this.onTextInput);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.activeBlockId !== this.state.activeBlockId) {
            // 目标block变动
            const targetNode = document.getElementById(this.state.activeBlockId);
            const range = new Range();
            if (this.state.toStart) {
                range.setStart(targetNode, 0);
            } else {
                const { curActiveNode } = this.noteStore;
                if (targetNode.firstChild) {
                    range.setStart(targetNode.firstChild, targetNode.firstChild.length);
                    range.setEnd(targetNode.firstChild, targetNode.firstChild.length);
                } else {
                    range.setStart(targetNode, 0);
                }
            }
            
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(range);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('selectionchange', this.onSelectionChange);
        this.editorRef.current.removeEventListener('textInput', this.onTextInput);
    }

    onSelectionChange = () => {
        if (!isRangeInNode(this.editorRef.current)) {
            return;
        }
        if (this.isCompositionStart) {
            return;
        }
        const {
            startNodeId,
            startNodeOffset,
            endNodeId,
            endNodeOffset,
            collapsed,
        } = getRangeInfo();

        const {
            startRange,
            endRange,
            nodes,
        } = this.noteStore;
        startRange.setRange({
            block: nodes.find(item => item.id === startNodeId),
            offset: startNodeOffset,
        });
        endRange.setRange({
            block: nodes.find(item => item.id === endNodeId),
            offset: endNodeOffset,
        });
        this.noteStore.isCollapsed = collapsed;
    }

    onKeyDown = (event) => {
        const {
            startRange,
            endRange,
            isCollapsed,
            curActiveNode,
        } = this.noteStore;
        if (event.code === 'Backspace') {
            const targetBlock = startRange.block;
            if (!targetBlock) {
                return;
            }
            if (startRange.offset > 1) {
                targetBlock.deleteText(startRange.offset - 1, 1);
            } else if (startRange.offset === 1) {
                // 最后一个元素没有触发selectionchange事件。。。
                targetBlock.deleteText(startRange.offset - 1, 1);
                startRange.offset = 0;
            } else {
                if (curActiveNode.text.length) {
                    const curIdx = this.noteStore.findTargetNodeIdxById(curActiveNode.id);
                    if (curIdx > 0) {
                        const preNode = this.noteStore.nodes[curIdx - 1];
                        preNode.insertText(curActiveNode.text, preNode.text.length);
                    }
                }
                const newTargetNode = this.noteStore.onDeleteBlock(targetBlock.id);
                this.setState({
                    activeBlockId: newTargetNode.id,
                    toStart: false,
                });
            }
            event.preventDefault();
        } else if (event.code === 'Enter') {
            const targetBlock = endRange.block;
            let newNode;
            if (endRange.offset === targetBlock.text.length) {
                // 段尾换行
                newNode = this.noteStore.onInsertBlock(targetBlock.id);
            } else {
                const text = targetBlock.text.slice(endRange.offset);
                targetBlock.deleteText(endRange.offset, targetBlock.text.length - endRange.offset);
                newNode = this.noteStore.onInsertBlock(targetBlock.id, text);
            }
            this.setState({
                activeBlockId: newNode.id,
                toStart: true,
            });
            event.preventDefault();
        }
    }

    onTextInput = (event) => {
        event.preventDefault();
        const text = event.data;
        const {
            startRange,
            endRange,
            isCollapsed,
        } = this.noteStore;
        if (isCollapsed) {
            const targetBlock = startRange.block;
            if (!targetBlock) {
                return;
            }
            targetBlock.insertText(text, startRange.offset);
        }
    }

    onCompositionStart = (evt) => {
        evt.preventDefault();
        this.isCompositionStart = true;
    }

    onCompositionEnd = (evt) => {
        evt.preventDefault();
        this.isCompositionStart = false;
    }

    render() {
        const { nodes } = this.noteStore;
        return (
            <div
                className={s.editor}
                ref={this.editorRef}
                contentEditable
                onKeyDown={this.onKeyDown}
                onCompositionStart={this.onCompositionStart}
                onCompositionEnd={this.onCompositionEnd}
            >
                {
                    nodes.map((item) => {
                        const { id } = item;
                        return (
                            <Text store={item} key={id} />
                        );
                    })
                }
            </div>
        )
    }
}

export default EditorCore;