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
} from './actions';
import APIService from '../../lib/apiService';

export const fetchProducts = () => {
  return async dispatch => {
    dispatch(fetchProductsPending());
    const products = await APIService.getProducts();
    dispatch(fetchProductsSuccess(products));
    return products;
  };
};

export const fetchStores = () => {
  return async dispatch => {
    dispatch(fetchStoresPending());
    const stores = await APIService.getStores();
    dispatch(fetchStoresSuccess(stores));
    return stores;
  };
};

export const fetchCatalog = storeID => {
  return async dispatch => {
    dispatch(fetchCatalogPending());
    const catalog = await APIService.getStoreCatalog(storeID);
    dispatch(fetchCatalogSuccess(catalog));
    return catalog;
  };
};

export const fetchIngredients = () => {
  return async dispatch => {
    dispatch(fetchIngredientsPending());
    const ingredients = await APIService.getIngredients();
    dispatch(fetchIngredientsSuccess(ingredients));
    return ingredients;
  };
};

