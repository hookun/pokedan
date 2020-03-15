export const dataURI = (
    type: string,
    data: string,
): string => `data:${type};base64,${data}`;
