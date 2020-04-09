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
} from '../actions/actionTypes';

const initState = {
  products: {},
  stores: {}, // except catalog
  catalog: {}, // store catalogue of the store Selected,
  ingredients: {},
  selectedStoreId: 'S1',
  isLoading: false,
  pending: false,
  error: null,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case ITEM_DELETED:
      return {
        ...state,
      }
    case FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        pending: true,
        isLoading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        pending: false,
        products: action.payload,
        isLoading: false,
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
        isLoading: false,
      };
    case FETCH_STORES_PENDING:
      return {
        ...state,
        stores: true,
        isLoading: true,
      };
    case FETCH_STORES_SUCCESS:
      return {
        ...state,
        pending: false,
        stores: action.payload,
        isLoading: false,
      };
    case FETCH_STORES_ERROR:
      return {
        ...state,
        pending: false,
        stores: action.error,
        isLoading: false,
      };
    case FETCH_CATALOG_PENDING:
      return {
        ...state,
        catalog: true,
        isLoading: true,
      };
    case FETCH_CATALOG_SUCCESS:
      return {
        ...state,
        pending: false,
        catalog: action.payload,
        isLoading: false,
      };
    case FETCH_CATALOG_ERROR:
      return {
        ...state,
        pending: false,
        catalog: action.error,
        isLoading: false,
      };
    case FETCH_INGREDIENTS_PENDING:
      return {
        ...state,
        ingredients: true,
        isLoading: true,
      };
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        pending: false,
        ingredients: action.payload,
        isLoading: false,
      };
    case FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        pending: false,
        ingredients: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
