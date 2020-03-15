import {DBName} from '../constants';

export const Stores = {
    version: 1,
    Root: 'Root',
    Message: 'Message',
};

const openDB = async (name: string) => await new Promise<IDBDatabase>((resolve, reject) => {
    const req = indexedDB.open(name, Stores.version);
    req.addEventListener('success', () => resolve(req.result));
    req.addEventListener('error', () => reject(req.error));
    req.addEventListener('blocked', () => reject(req.error));
    req.addEventListener('upgradeneeded', () => {
        const db = req.result;
        db.createObjectStore(Stores.Root);
        db.createObjectStore(Stores.Message);
    });
});

const openTransaction = async (
    props: {
        store: string,
        mode: IDBTransactionMode,
    },
) => {
    const db = await openDB(DBName);
    return db.transaction(props.store, props.mode);
};

export const readDB = async <Type>(
    store: string,
    key: string,
): Promise<Type> => {
    const transaction = await openTransaction({store, mode: 'readonly'});
    return await new Promise<Type>((resolve, reject) => {
        const req = transaction.objectStore(store).get(key);
        req.addEventListener('error', () => reject(req.error));
        req.addEventListener('success', () => resolve(req.result));
    });
};

export const writeDB = async <Type>(
    store: string,
    key: string,
    value: Type,
): Promise<void> => {
    const transaction = await openTransaction({store, mode: 'readwrite'});
    return await new Promise<void>((resolve, reject) => {
        const req = transaction.objectStore(store).put(value, key);
        req.addEventListener('error', () => reject(req.error));
        req.addEventListener('success', () => resolve());
    });
};

export const deleteDB = async (
    store: string,
    key: string,
): Promise<void> => {
    const transaction = await openTransaction({store, mode: 'readwrite'});
    return await new Promise<void>((resolve, reject) => {
        const req = transaction.objectStore(store).delete(key);
        req.addEventListener('error', () => reject(req.error));
        req.addEventListener('success', () => resolve());
    });
};
