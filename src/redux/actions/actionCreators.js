import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError,
  fetchStoresPending,
  fetchStoresSuccess,
  fetchStoresError,
  fetchCatalogPending,
  fetchCatalogSuccess,
  fetchCatalogError,
  fetchIngredientsPending,
  fetchIngredientsSuccess,
  fetchIngredientsError,
} from './actions';
import APIService from '../../lib/apiService';

export const fetchProducts = () => {
  return async dispatch => {
    dispatch(fetchProductsPending());
    const products = await APIService.getProducts();
    dispatch(fetchProductsSuccess(products));
    return products;
    // fetch('https://example.com/products')
    //     .then(res => res.json())
    //     .then(res => {
    //         if(res.error) {
    //             throw(res.error);
    //         }
    //         dispatch(fetchProductsSuccess(res.products);
    //         return res.products;
    //     })
    //     .catch(error => {
    //         dispatch(fetchProductsError(error));
    //     })
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
