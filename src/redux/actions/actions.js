import {
  ITEM_ADDED,
  ITEM_SUBTRACTED,
  ITEM_DELETED,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_STORES_PENDING,
  FETCH_STORES_SUCCESS,
  FETCH_STORES_ERROR,
  FETCH_CATALOG_PENDING,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_ERROR,
  FETCH_INGREDIENTS_PENDING,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_ERROR,
  ADD_ITEM_TO_INGREDIENTS_LIST,
  REMOVE_ITEM_FROM_INGREDIENTS_LIST,
  DELETE_ITEM_FROM_INGREDIENTS_LIST,
} from './actionTypes';

export function itemAdded(data) {
  return {type: ITEM_ADDED, payload: data};
}

export function itemSubtracted(data) {
  return {type: ITEM_SUBTRACTED, payload: data};
}

export function itemDeleted(data) {
  return {type: ITEM_DELETED, payload: data};
}

export function fetchProductsPending() {
  return {
    type: FETCH_PRODUCTS_PENDING,
  };
}

export function fetchProductsSuccess(payload) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload,
  };
}

export function fetchProductsError(error) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    payload: error,
  };
}

export function fetchStoresPending() {
  return {
    type: FETCH_STORES_PENDING,
  };
}

export function fetchStoresSuccess(payload) {
  return {
    type: FETCH_STORES_SUCCESS,
    payload,
  };
}

export function fetchStoresError(error) {
  return {
    type: FETCH_STORES_ERROR,
    payload: error,
  };
}

export function fetchCatalogPending() {
  return {
    type: FETCH_CATALOG_PENDING,
  };
}

export function fetchCatalogSuccess(payload) {
  return {
    type: FETCH_CATALOG_SUCCESS,
    payload,
  };
}

export function fetchCatalogError(error) {
  return {
    type: FETCH_CATALOG_ERROR,
    payload: error,
  };
}

export function fetchIngredientsPending() {
  return {
    type: FETCH_INGREDIENTS_PENDING,
  };
}

export function fetchIngredientsSuccess(payload) {
  return {
    type: FETCH_INGREDIENTS_SUCCESS,
    payload,
  };
}

export function fetchIngredientsError(error) {
  return {
    type: FETCH_INGREDIENTS_ERROR,
    payload: error,
  };
}

export function addItemToIngredientsListAction(productId) {
  return {
    type: ADD_ITEM_TO_INGREDIENTS_LIST,
    payload: {productId},
  };
}

export function removeItemFromIngredientsListAction(productId) {
  return {
    type: REMOVE_ITEM_FROM_INGREDIENTS_LIST,
    payload: {productId},
  };
}

export function deleteItemFromCartAction(productId) {
  return {
    type: DELETE_ITEM_FROM_INGREDIENTS_LIST,
    payload: {productId},
  };
}
