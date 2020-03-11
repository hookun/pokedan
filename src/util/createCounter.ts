export const createCounter = (
    startCount = 0,
) => {
    let count = startCount;
    return () => count++;
};
