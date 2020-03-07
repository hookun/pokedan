export const clearStyleSheet = (
    sheet: CSSStyleSheet,
): void => {
    while (0 < sheet.cssRules.length) {
        sheet.removeRule(sheet.cssRules.length - 1);
    }
};
