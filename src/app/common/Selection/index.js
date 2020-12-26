export function isRangeInNode(node) {
    if (!node) {
        return false;
    }

    let common;

    range = range || document.getRange();
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