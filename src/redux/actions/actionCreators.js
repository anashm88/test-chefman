import {
  fetchProductsPending,
  fetchProductsSuccess,
  fetchProductsError,
} from './actions';
import APIService from '../../lib/apiService';

export const fetchProducts = () => {
  return async dispatch => {
    dispatch(fetchProductsPending());
    const products = await APIService.getProducts();
    setTimeout(() => {
      dispatch(fetchProductsSuccess(products));
    }, 500);
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
