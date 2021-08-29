export const StorageDataAccessor = {

    sessionStorage: {
        setObj(key, value, minutesToExpire = null) {
            if (typeof window !== 'undefined') {

                window.sessionStorage.setItem(key, setupCacheObj(value, minutesToExpire));
            }
        },
        getObj(key) {
            if (typeof window !== 'undefined') {

                return getCacheObj(window.sessionStorage.getItem(key), key);
            }
            return null
        },
        removeItem(key) {
            if (typeof window !== 'undefined') {
                window.sessionStorage.removeItem(key)
            }
        }
    },
    localStorage: {
        setObj(key, value, minutesToExpire = null) {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, setupCacheObj(value, minutesToExpire));
            }
        },
        getObj(key) {
            if (typeof window !== 'undefined') {
                return getCacheObj(window.localStorage.getItem(key), key);
            }
            return null
        },
        removeItem(key) {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key)
            }
        }
    }
}

export const removeItem = (key) => {
    console.warn('Please consider using StorageAccessor to removeItem')
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        window.sessionStorage.removeItem(key);
    }
}

const setupCacheObj = (value, minutesToExpire = null) => {
    let cacheObj = { data: value };
    if (minutesToExpire) {
        const now = new Date();
        cacheObj.TimeToExpire = new Date(now.getTime() + minutesToExpire * 60000);
    }
    return JSON.stringify(cacheObj);
}
const getCacheObj = (rawJson, key) => {
    let cacheObj = JSON.parse(rawJson);
    if (!cacheObj || (cacheObj.TimeToExpire && new Date(cacheObj.TimeToExpire) < new Date())) {
        removeItem(key);
        return null;
    }
    return cacheObj.data;
}