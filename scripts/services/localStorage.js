class LocalStorage {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }

    saveData(data) {
        try {
            const serializeData = JSON.stringify(data);
            localStorage.setItem(this.storageKey, serializeData);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage', error);
            return false;
        }
    }
}