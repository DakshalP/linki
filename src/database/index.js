import { Store } from 'secure-webstore';

const LINK_DB_NAME = 'meeting-links';

//for id & key generation
const getUUID = () => {
    //uuidv4
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
};

const doesDBExist = async () => {
    if (!window.indexedDB) throw new Error('IndexedDB not supported');
    else
        return (await window.indexedDB.databases())
            .map((db) => db.name)
            .includes(LINK_DB_NAME);
};

const createStore = async (passkey) => {
    const store = new Store(LINK_DB_NAME, passkey);
    await store.init();
    return store;
};

// meetingExample = {
//     _id: 'auto_generated_uuid',
//     name: 'meet',
//     link: 'https://example.com/meet',
//     pass: '--',
//     tags: ['school', 'ENG101'],
//     day: 'Tuesday',
//     time: '10AM
// };
const createMeeting = async (store, meeting) => {
    if (!store || !meeting) throw Error('Error adding to Meeting DB.');
    const meetingId = getUUID();
    meeting._id = meetingId;
    await store.set(meetingId, meeting);
};

const editMeeting = async (store, meeting) => {
    if (!store || !meeting) throw Error('Error editing Meeting DB.');
    const meetingId = meeting._id;
    await store.set(meetingId, meeting);
};

const deleteMeeting = async (store, meeting) => {
    await store.del(meeting._id);
};

const getMeeting = async (store, key) => {
    return await store.get(key);
};

const getAllMeetings = async (store) => {
    const keys = await store.keys();
    const meetings = await Promise.all(
        keys.map((key) => getMeeting(store, key))
    );
    return meetings;
};

export {
    createStore,
    getMeeting,
    createMeeting,
    editMeeting,
    deleteMeeting,
    getAllMeetings,
    doesDBExist,
};
