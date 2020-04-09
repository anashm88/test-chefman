import {data} from './MockData';
import _ from 'lodash';

export default class ApiService {
  static async getStores() {
    const stores = _.cloneDeep(data.stores);
    const extractedStoreIdObject = {};
    stores.forEach(item => {
      delete item.catalog;
      extractedStoreIdObject[item.storeId] = item;
    });
    return extractedStoreIdObject; // return without catalog
  }
  static async getProducts() {
    const products = _.cloneDeep(data.products);
    const extractedProductIdObject = {};
    products.forEach(item => {
      extractedProductIdObject[item.productId] = item;
    });
    return extractedProductIdObject;
  }
  static async getStoreCatalog(storeId) {
    // logic to return catalog of store with id as storeID
    // only array of catalog for that store
    const stores = _.cloneDeep(data.stores);
    const extractedProductIdCatalog = {};
    stores.forEach(item => {
      if (storeId === item.storeId) {
        item.catalog.forEach(val => {
          extractedProductIdCatalog[val.productId] = val;
        });
      }
    });
    return extractedProductIdCatalog;
  }
  static async getIngredients() {
    const ingredients = _.cloneDeep(data.ingredients);
    const extractedProductIdIngredients = {};
    ingredients.forEach(item => {
      extractedProductIdIngredients[item.productId] = item;
    });
    return extractedProductIdIngredients;
  }

  static async placeOrder(orderItems) {
    console.log('order placed');
  }
}
