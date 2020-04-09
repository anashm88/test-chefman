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
} from '../actions/actionTypes';
import _ from 'lodash';

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
  let productId;
  switch (action.type) {
    case ITEM_DELETED:
      return {
        ...state,
      };
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
    case ADD_ITEM_TO_INGREDIENTS_LIST:
      productId = action.payload.productId;
      if (state.ingredients[productId]) {
        let qty = state.ingredients[productId].quantity;
        if (qty >= state.catalog[productId].maxQuantity) {
          return {
            ...state,
            error: 'Max Quantity reached',
          };
        } else {
          let ingredients = _.clone(state.ingredients);
          ingredients[productId].quantity++;
          return {
            ...state,
            ingredients,
          };
        }
      } else {
        if (
          state.catalog[productId] &&
          state.catalog[productId].maxQuantity > 0
        ) {
          return {
            ...state,
            ingredients: {
              ...state.ingredients,
              [productId]: {productId, quantity: 1},
            },
          };
        } else {
          return {
            ...state,
            error: 'Item out of stock',
          };
        }
      }
    case REMOVE_ITEM_FROM_INGREDIENTS_LIST:
      productId = action.payload.productId;
      if (state.ingredients[productId]) {
        let ingredients = _.clone(state.ingredients);
        if (state.ingredients[productId].quantity === 1) {
          delete ingredients[productId];
        } else {
          ingredients[productId].quantity--;
        }
        return {
          ...state,
          ingredients,
        };
      } else {
        return {
          ...state,
          error: "Can't remove this item",
        };
      }
    case DELETE_ITEM_FROM_INGREDIENTS_LIST:
      debugger;
      productId = action.payload.productId;
      if (state.ingredients[productId]) {
        let ingredients = _.clone(state.ingredients);
        delete ingredients[productId];
        return {
          ...state,
          ingredients,
        };
      }
    default:
      return state;
  }
};

export default rootReducer;
