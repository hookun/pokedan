import * as parse5 from 'parse5';

type TreeNode =
| parse5.DefaultTreeDocument
| parse5.DefaultTreeNode;

export const walkParse5Tree = function* (
    node: TreeNode,
): Generator<TreeNode> {
    yield node;
    if ('childNodes' in node) {
        for (const childNode of node.childNodes) {
            yield* walkParse5Tree(childNode);
        }
    }
};
