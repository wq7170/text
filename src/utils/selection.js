import { TextNodeType } from './nodeTypes';

export function getRange() {
    return document.getSelection().getRangeAt(0);
}

export function getBlockEl(node) {
    while(node.nodeType === 3 || node.getAttribute('datatype') !== TextNodeType && node) {
        node = node.parentNode;
    }

    return node;
}

export function isRangeInNode(node) {
    if (!node) {
        return false;
    }

    let common;

    const range = getRange();
    if (!range) {
        return false;
    }

    common = range.commonAncestorContainer;

    while (common) {
        if (common === node) {
            return true;
        }
        common = common.parentNode;
    }

    return false;
}

export function getRangeInfo() {
    const range = getRange();
    let {
        startContainer,
        startOffset,
        endContainer,
        endOffset,
        collapsed,
    } = range;
    const startNodeId = getBlockEl(startContainer).id;
    const endNodeId = getBlockEl(endContainer).id;

    return {
        startNodeId,
        startNodeOffset: startOffset,
        endNodeId,
        endNodeOffset: endOffset,
        collapsed,
    };
}