import {data} from './mockData';

export default class APIService {
  static async getStores() {
    const stores = [...data.stores];
    stores.forEach(item => {
      delete item.catalog;
    });
    return stores; // return without catalog
  }
  static async getProducts() {
    return data.products;
  }
  static async getStoreCatalog(storeId) {
    // logic to return catalog of store with id as storeID
    // only array of catalog for that store
    const stores = [...data.stores];
    stores.forEach(item => {
      if (storeId === item.storeId) {
        return item.catalog;
      }
    });
    return 'store catalog not found';
  }
  static async getIngredients() {
    return data.ingredients;
  }
}
