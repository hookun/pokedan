import {useMemo, useEffect} from 'react';
import {clearStyleSheet} from './clearStyleSheet';

export const useStyleSheet = (rules: Array<string>) => {
    const style = useMemo(() => document.createElement('style'), []);
    useEffect(() => {
        document.head.append(style);
        return () => style.remove();
    }, [style]);
    useEffect(() => {
        const sheet = style.sheet as CSSStyleSheet;
        clearStyleSheet(sheet);
        rules.forEach((rule, index) => sheet.insertRule(rule, index));
    }, rules);
    return style;
};
