import {
  ADD_DATA,
  ADD_WISHLIST,
  DECREASE_PRODUCT_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  ORDER_LIST,
  REMOVE_ALL_PRODUCTS,
  REMOVE_DATA,
} from '../actionTypes';

export function addProduct(payload: any) {
  return {
    type: ADD_DATA,
    data: payload,
  };
}
export function decQun(payload: any) {
  return {
    type: DECREASE_PRODUCT_QUANTITY,
    data: payload,
  };
}
export function incQun(payload: any) {
  return {
    type: INCREASE_PRODUCT_QUANTITY,
    data: payload,
  };
}
export function removeProduct(payload: any) {
  return {
    type: REMOVE_DATA,
    data: payload,
  };
}

export function removeAllProduct(payload: any) {
  return {
    type: REMOVE_ALL_PRODUCTS,
    data: payload,
  };
}

export function addWishList(payload: any) {
  return {
    type: ADD_WISHLIST,
    data: payload,
  };
}
export function addOrderList(payload: any) {
  return {
    type: ORDER_LIST,
    data: payload,
  };
}
