export class StorageUtil {
  static setItem<T>(key: string, value: T | string): void {
    let storageItem = value;

    // If value is an object, stringifying it
    if (typeof value === "object" && value !== null) {
      storageItem = JSON.stringify(value);
    }

    try {
      localStorage.setItem(
        key,
        typeof storageItem === "string"
          ? storageItem
          : JSON.stringify(storageItem)
      );
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  static getItem<T>(key: string): T | string | null {
    try {
      const item = localStorage.getItem(key);

      if (!item) return null;

      // Check if the item is a JSON string
      if (this.isJson(item)) {
        return JSON.parse(item);
      }

      // If it's not JSON, return it as is (it could be a string, number, or boolean)
      return item;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from localStorage", error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  }

  static hasItem(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error("Error checking item existence in localStorage", error);
      return false;
    }
  }

  // Helper method to check if a string is valid JSON
  private static isJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      console.error("Error parsing JSON", error);
      return false;
    }
  }
}
