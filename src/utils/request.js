export const StorageKey = 'note_storage_key';

export const getPageListIds = () => new Promise((res, rej) => {
    const ids = localStorage.getItem(StorageKey) || '[]';
    res(JSON.parse(ids));
});

export const getPageInfoById = (id) => new Promise((res, rej) => {
    res(JSON.parse(localStorage.getItem(id)));
});

export const savePageList = (info) => localStorage.setItem(StorageKey, JSON.stringify(info));

export const savaPageInfo = (id, info) => localStorage.setItem(id, JSON.stringify(info));

export const deletePageById = (id) => localStorage.removeItem(id);