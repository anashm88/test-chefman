import {
  addItemToIngredientsListAction,
  deleteItemFromCartAction,
  fetchCatalogPending,
  fetchCatalogSuccess,
  fetchIngredientsPending,
  fetchIngredientsSuccess,
  fetchProductsPending,
  fetchProductsSuccess,
  fetchStoresPending,
  fetchStoresSuccess,
  removeItemFromIngredientsListAction,
} from './Actions';
import ApiService from '../../lib/ApiService';

export const fetchProducts = () => {
  return async dispatch => {
    dispatch(fetchProductsPending());
    const products = await ApiService.getProducts();
    dispatch(fetchProductsSuccess(products));
    return products;
  };
};

export const fetchStores = () => {
  return async dispatch => {
    dispatch(fetchStoresPending());
    const stores = await ApiService.getStores();
    dispatch(fetchStoresSuccess(stores));
    return stores;
  };
};

export const fetchCatalog = storeID => {
  return async dispatch => {
    dispatch(fetchCatalogPending());
    const catalog = await ApiService.getStoreCatalog(storeID);
    dispatch(fetchCatalogSuccess(catalog));
    return catalog;
  };
};

export const fetchIngredients = () => {
  return async dispatch => {
    dispatch(fetchIngredientsPending());
    const ingredients = await ApiService.getIngredients();
    dispatch(fetchIngredientsSuccess(ingredients));
    return ingredients;
  };
};

export const setSelectedStore = (storeId) => {
  return async dispatch => {
    const catalog = await APIService.getStoreCatalog(storeId);
    dispatch(fetchCatalogSuccess(catalog));
    dispatch(updateSelectedStoreAction(storeId));
  }
}

