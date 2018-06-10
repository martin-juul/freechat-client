export class LocalStorage
{
  static set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('[LocalStorageService]: Error saving to localStorage', e);
    }
  }

  static get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('[LocalStorageService]: Error retrieving data from localStorage', e);
    }
  }

  static removeItem(key: string) {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error(`[LocalStorageService]: Error clearing item ${key}`, e);
    }
  }

  static clear() {
    try {
      localStorage.clear()
    } catch (e) {
      console.error('[LocalStorageService]: Error clearing localStorage', e);
    }
  }
}
