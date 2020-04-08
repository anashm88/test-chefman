import {
  ITEM_ADDED,
  ITEM_SUBTRACTED,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
} from '../actions/actionTypes';

const initState = {
  products: [],
  stores: [], // except catalog
  catalog: [], // store catalogue of the store Selected,
  ingredients: [],
  selectedStoreId: null,
  isLoading: false,
  pending: false,
  error: null,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default rootReducer;
