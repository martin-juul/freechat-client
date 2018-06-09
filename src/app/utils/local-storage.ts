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
}
