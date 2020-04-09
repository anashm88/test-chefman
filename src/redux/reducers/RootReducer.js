import {
  ADD_ITEM_TO_INGREDIENTS_LIST,
  DELETE_ITEM_FROM_INGREDIENTS_LIST,
  FETCH_CATALOG_ERROR,
  FETCH_CATALOG_PENDING,
  FETCH_CATALOG_SUCCESS,
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS_PENDING,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_STORES_ERROR,
  FETCH_STORES_PENDING,
  FETCH_STORES_SUCCESS,
  REMOVE_ITEM_FROM_INGREDIENTS_LIST,
  UPDATE_SELECTED_STORE,
  UPDATE_USER_DETAILS,
} from '../actions/ActionTypes';
import _ from 'lodash';

const initState = {
  products: {},
  stores: {}, // except catalog
  catalog: {}, // store catalogue of the store Selected,
  ingredients: {},
  userDetails: {
    name: 'John',
    address: 'Sector 34, LA',
    phone: '7847032983',
  },
  selectedStoreId: 'S2',
  isLoading: false,
  pending: false,
  error: null,
  totalItems: 0,
  totalPrice: 0,
};

const calculateTotalItemsAndTotalPrice = (ingredients, catalog) => {
  let totalItems = 0;
  let totalPrice = 0;
  for (const productId in ingredients) {
    totalItems += ingredients[productId].quantity;
    totalPrice +=
      ingredients[productId].quantity *
      (catalog[productId] ? catalog[productId].price : 0);
  }

  return {totalItems, totalPrice};
};

const rootReducer = (state = initState, action) => {
  let productId;
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
        ...calculateTotalItemsAndTotalPrice(state.ingredients, action.payload),
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
        ...calculateTotalItemsAndTotalPrice(action.payload, state.catalog),
      };
    case FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        pending: false,
        ingredients: action.error,
        isLoading: false,
      };
    case UPDATE_SELECTED_STORE:
      return {
        selectedStoreId: action.payload.storeId,
        ...calculateTotalItemsAndTotalPrice(state.ingredients, state.catalog),
      };
    case ADD_ITEM_TO_INGREDIENTS_LIST:
      productId = action.payload.productId;
      if (state.ingredients[productId]) {
        let qty = state.ingredients[productId].quantity;
        let maxQuantity = state.catalog[productId]
          ? state.catalog[productId].maxQuantity
          : 0;
        if (qty >= maxQuantity) {
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
            ...calculateTotalItemsAndTotalPrice(ingredients, state.catalog),
          };
        }
      } else {
        if (
          state.catalog[productId] &&
          state.catalog[productId].maxQuantity > 0
        ) {
          let ingredients = {
            ...state.ingredients,
            [productId]: {productId, quantity: 1},
          };
          return {
            ...state,
            ingredients,
            ...calculateTotalItemsAndTotalPrice(ingredients, state.catalog),
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
        let maxQuantity = state.catalog[productId]
          ? state.catalog[productId].maxQuantity
          : 0;
        if (maxQuantity >= state.ingredients[productId].quantity) {
          let ingredients = _.clone(state.ingredients);
          if (state.ingredients[productId].quantity === 1) {
            delete ingredients[productId];
          } else {
            ingredients[productId].quantity--;
          }
          return {
            ...state,
            ingredients,
            ...calculateTotalItemsAndTotalPrice(ingredients, state.catalog),
          };
        } else {
          return state;
        }
      } else {
        return {
          ...state,
          error: "Can't remove this item",
        };
      }
    case DELETE_ITEM_FROM_INGREDIENTS_LIST:
      productId = action.payload.productId;
      if (state.ingredients[productId]) {
        let ingredients = _.clone(state.ingredients);
        delete ingredients[productId];
        return {
          ...state,
          ingredients,
          ...calculateTotalItemsAndTotalPrice(ingredients, state.catalog),
        };
      } else {
        return state;
      }
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload.userDetails,
      };
    default:
      return state;
  }
};

export default rootReducer;
