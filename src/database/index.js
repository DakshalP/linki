import { Store } from 'secure-webstore';

const LINK_DB_NAME = 'meeting-links';

const doesDBExist = async () => {
    return (await window.indexedDB.databases())
        .map((db) => db.name)
        .includes(LINK_DB_NAME);
};

const createStore = async (passkey) => {
    const store = new Store(LINK_DB_NAME, passkey);
    await store.init();
};

export { createStore, doesDBExist };
