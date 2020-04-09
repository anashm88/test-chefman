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

export const fetchCatalogAndSetSelectedStore = storeId => {
  return async dispatch => {
    dispatch(fetchCatalogPending());
    const catalog = await ApiService.getStoreCatalog(storeId);
    dispatch(fetchCatalogSuccess({catalog, selectedStoreId: storeId}));
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

