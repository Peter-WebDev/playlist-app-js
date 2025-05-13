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

    loadData() {
        try {
            const serializeData = localStorage.getItem(this.storageKey);
            return serializeData ? JSON.parse(serializeData) : null;
        } catch (error) {
            console.error('Error loading from localStorage', error);
            return null;
        }
    }

    removeData() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage', error);
            return false;
        }
    }
}