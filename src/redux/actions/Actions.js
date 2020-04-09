import {
  ADD_ITEM_TO_INGREDIENTS_LIST,
  DELETE_ITEM_FROM_INGREDIENTS_LIST,
  FETCH_CATALOG_PENDING,
  FETCH_CATALOG_SUCCESS,
  FETCH_INGREDIENTS_PENDING,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_STORES_PENDING,
  FETCH_STORES_SUCCESS,
  REMOVE_ITEM_FROM_INGREDIENTS_LIST,
  UPDATE_USER_DETAILS,
} from './ActionTypes';

export function updateUserDetails(data) {
  return {type: UPDATE_USER_DETAILS, payload: data};
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

export function updateSelectedStoreAction(storeId) {
  return {
    type: UPDATE_SELECTED_STORE,
    payload: {storeId},
  }
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
