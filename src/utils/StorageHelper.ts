import { LOCAL_STORAGE_ERROR_GET, LOCAL_STORAGE_ERROR_REMOVE, LOCAL_STORAGE_ERROR_SET } from "../constants";

export class StorageHelper {

  static setItem = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      throw new Error(LOCAL_STORAGE_ERROR_SET);
    }
  }

  static getItem = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch {
      throw new Error(LOCAL_STORAGE_ERROR_GET);
    }
  }

  static removeItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      throw new Error(LOCAL_STORAGE_ERROR_REMOVE);
    }
  }

}