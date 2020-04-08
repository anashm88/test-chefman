import {
  ITEM_ADDED,
  ITEM_SUBTRACTED,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
} from './actionTypes';

export function itemAdded(data) {
  return {type: ITEM_ADDED, payload: data};
}

export function itemSubtracted(data) {
  return {type: ITEM_SUBTRACTED, payload: data};
}

export function fetchProductsPending() {
  return {
    type: FETCH_PRODUCTS_PENDING,
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
}

export function fetchProductsError(error) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    payload: error,
  };
}
