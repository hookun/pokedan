import {MessageFragment} from '../types';
import {textColors} from '../constants';
import {walkNode, walkNodeContents} from './walkNode';

const blockElementTagName = new Set(['DIV']);
const getTagName = (element: Element): string => element.tagName.toUpperCase();
const isFirstElement = (element: Node): boolean => {
    let {previousSibling} = element;
    while (previousSibling) {
        switch (previousSibling.nodeType) {
            case Node.ELEMENT_NODE:
                return false;
            case Node.TEXT_NODE:
                if (previousSibling.textContent) {
                    return false;
                }
            default:
        }
        previousSibling = previousSibling.previousSibling;
    }
    return true;
};

export const getMessageFragments = function* (element: Node): Generator<MessageFragment> {
    const currentColorMap = new Map<HTMLElement, string>();
    let color = textColors[0];
    let text = '';
    for (const step of walkNodeContents<HTMLElement>(element)) {
        console.log(walkNode.stringifyStep(step));
        switch (step.type) {
            case walkNode.Text:
                text += step.node.textContent;
                break;
            case walkNode.Enter: {
                const {node} = step;
                color = node.style.color || color;
                currentColorMap.set(node, color);
                if (blockElementTagName.has(getTagName(node)) && !isFirstElement(node)) {
                    text += '\n';
                }
                break;
            }
            case walkNode.Leave:
                if (text) {
                    yield {color, text};
                }
                color = currentColorMap.get(step.node.parentElement);
                text = '';
                break;
            default:
        }
    }
    currentColorMap.clear();
};

// export const getNearestColor = (text: Node, root: Element) => {
//     let node = text.parentNode as HTMLElement;
//     while (node !== root) {
//         const {style: {color}} = node;
//         if (color) {
//             return color;
//         }
//         node = node.parentNode as HTMLElement;
//     }
//     return textColors[0];
// };

// export const getMessageFragments = function* (element: Element): Generator<MessageFragment> {
//     const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
//     let node = walker.nextNode();
//     while (node) {
//         const text = node.textContent;
//         const color = getNearestColor(node, element);
//         if (text) {
//             yield {text, color};
//         }
//         node = walker.nextNode();
//     }
// };
