import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * Polyfill for indexedDB.databases()
 * Safari and some other older browsers that support indexedDB do NOT
 * Support enumerating existing databases.
 *
 * Credit: https://stackoverflow.com/questions/57787209/safari-does-not-support-indexeddb-databases
 */

(function () {
    if (window.indexedDB && typeof window.indexedDB.databases === 'undefined') {
        const LOCALSTORAGE_CACHE_KEY = 'indexedDBDatabases';

        // Store a key value map of databases
        const getFromStorage = () =>
            JSON.parse(window.localStorage[LOCALSTORAGE_CACHE_KEY] || '{}');

        // Write the database to local storage
        const writeToStorage = (value) =>
            (window.localStorage[LOCALSTORAGE_CACHE_KEY] =
                JSON.stringify(value));

        IDBFactory.prototype.databases = () =>
            Promise.resolve(
                Object.entries(getFromStorage()).reduce(
                    (acc, [name, version]) => {
                        acc.push({ name, version });
                        return acc;
                    },
                    []
                )
            );

        // Intercept the existing open handler to write our DBs names
        // and versions to localStorage
        const open = IDBFactory.prototype.open;

        IDBFactory.prototype.open = function (...args) {
            const dbName = args[0];
            const version = args[1] || 1;
            const existing = getFromStorage();
            writeToStorage({ ...existing, [dbName]: version });
            return open.apply(this, args);
        };

        // Intercept the existing deleteDatabase handler remove our
        // dbNames from localStorage
        const deleteDatabase = IDBFactory.prototype.deleteDatabase;

        IDBFactory.prototype.deleteDatabase = function (...args) {
            const dbName = args[0];
            const existing = getFromStorage();
            delete existing[dbName];
            writeToStorage(existing);
            return deleteDatabase.apply(this, args);
        };
    }
})();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
