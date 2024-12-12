import {
  ADD_DATA,
  REMOVE_DATA,
  DECREASE_PRODUCT_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  REMOVE_ALL_PRODUCTS,
  ADD_WISHLIST,
  ORDER_LIST,
  UPDATE_ORDER_LIST,
  INCREASE_ORDER_LIST,
  DECREASE_ORDER_LIST,
  REMOVE_ORDER_LIST,
  ASS_STATUS_ORDER_LIST_DATA,
} from '../actionTypes';

interface ProductState {
  data: any;
  wishListData: any;
  orderListData: any;
}

const initialState: ProductState = {
  data: [],
  wishListData: [],
  orderListData: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case ADD_DATA: {
      const existingProductIndex = state.data.findIndex(
        (product: any) => product.name === action.data.name,
      );

      if (existingProductIndex !== -1) {
        const updatedProducts: any = [...state.data];
        if (action.data.quantity) {
          updatedProducts[existingProductIndex].quantity =
            updatedProducts[existingProductIndex].quantity +
            action.data.quantity;
        } else {
          updatedProducts[existingProductIndex].quantity += 1;
        }
        return {
          ...state,
          data: updatedProducts,
        };
      } else {
        return {
          ...state,
          data: [
            ...state.data,
            {
              ...action.data,
              quantity: action.data.quantity ? action.data.quantity : 1,
            },
          ],
        };
      }
    }

    case DECREASE_PRODUCT_QUANTITY: {
      return {
        ...state,
        data: state.data.map((product: any) =>
          product.name === action.data.name && product.quantity > 0
            ? {...product, quantity: product.quantity - 1}
            : product,
        ),
      };
    }

    case INCREASE_PRODUCT_QUANTITY: {
      return {
        ...state,
        data: state.data.map((product: any) =>
          product.name === action.data.name
            ? {...product, quantity: product.quantity + 1}
            : product,
        ),
      };
    }

    case REMOVE_DATA: {
      return {
        ...state,
        data: state.data.filter(
          (product: any) => product.name !== action.data.name,
        ),
      };
    }

    case REMOVE_ALL_PRODUCTS: {
      return {
        ...state,
        data: state.data.filter(
          (product: any) => product.storeID !== action.data.id,
        ),
      };
    }
    case ADD_WISHLIST: {
      const exists = state.wishListData.find(
        (p: any) => p.name === action.data.name,
      );
      return {
        ...state,
        wishListData: exists
          ? state.wishListData.filter((p: any) => p.name !== action.data.name) // Remove if it exists
          : [...state.wishListData, action.data],
      };
    }

    case ORDER_LIST: {
      return {
        ...state,
        orderListData: [...state.orderListData, action.data],
      };
    }

    case UPDATE_ORDER_LIST: {
      const {newProduct, storeId, quantity} = action.payload;

      return {
        ...state,
        orderListData: state.orderListData.map((order: any) => {
          // if (order?.storeData?.id === storeId) {
          //   const existingProductIndex = order.products.findIndex(
          //     (product: any) => product.name === newProduct.name,
          //   );
          //   if (existingProductIndex === -1) {
          //     const updatedProducts: any = [...order.products];
          //     if (quantity) {
          //       updatedProducts[existingProductIndex].quantity =
          //         updatedProducts[existingProductIndex].quantity + quantity;
          //     } else {
          //       updatedProducts[existingProductIndex].quantity += 1;
          //     }
          //     return {
          //       ...order,
          //       products: updatedProducts,
          //       price: calculatePrice([...order.products, newProduct]),
          //     };
          //   } else {
          //     return {
          //       ...order,
          //       products: [...order.products, newProduct],
          //       price: calculatePrice([...order.products, newProduct]),
          //     };
          //   }
          // } else {
          //   return order;
          // }
          //  order?.storeData?.id === storeId
          //   ? return {
          //       ...order,
          //       products: [...order.products, newProduct],
          //       price: calculatePrice([...order.products, newProduct]),
          //     }
          //   :return order}
          if (order?.storeData?.id === storeId) {
            return {
              ...order,
              products: [...order.products, newProduct],
              price: calculatePrice([...order.products, newProduct]),
            };
          } else {
            return order;
          }
        }),
      };
    }
    case INCREASE_ORDER_LIST: {
      const {productId, storeId} = action.payload;
      return {
        ...state,
        orderListData: state.orderListData.map((store: any) => {
          if (store?.storeData?.id === storeId) {
            const updatedProducts = store.products.map((product: any) => {
              if (product.id === productId) {
                return {
                  ...product,
                  quantity: (product.quantity ?? 1) + 1,
                };
              }
              return product;
            });
            const newSubtotal = updatedProducts.reduce(
              (sum: any, product: any) =>
                sum + product.price * (product.quantity ?? 1),
              0,
            );
            const newTax = (Number(newSubtotal) * 1) / 100;
            const newTotal = Number(newSubtotal) + newTax + 2;
            return {
              ...store,
              products: updatedProducts,
              price: {
                ...store.price,
                subtotal: Number(newSubtotal).toFixed(2) || 0,
                total: Number(newTotal).toFixed(2) || 0,
              },
            };
          }
          return store;
        }),
      };
    }
    case DECREASE_ORDER_LIST: {
      const {productId, storeId} = action.payload;
      return {
        ...state,
        orderListData: state.orderListData.map((store: any) => {
          if (store?.storeData?.id === storeId) {
            const updatedProducts = store.products.map((product: any) => {
              if (product.id === productId && product.quantity > 1) {
                return {
                  ...product,
                  quantity: product.quantity - 1,
                };
              }
              return product;
            });
            const newSubtotal = updatedProducts.reduce(
              (sum: any, product: any) =>
                sum + product.price * product.quantity,
              0,
            );
            const newTax = (newSubtotal * 1) / 100;
            const newTotal = newSubtotal + newTax + 2;
            return {
              ...store,
              products: updatedProducts,
              price: {
                ...store.price,
                subtotal: Number(newSubtotal).toFixed(2),
                total: Number(newTotal).toFixed(2),
              },
            };
          }
          return store;
        }),
      };
    }
    case REMOVE_ORDER_LIST: {
      const {productId, storeId} = action.payload;

      return {
        ...state,
        orderListData: state.orderListData.map((order: any) =>
          order?.storeData?.id === storeId
            ? {
                ...order,
                products: order.products.filter(
                  (product: any) => product.id !== productId,
                ),
                price: calculatePrice(
                  order.products.filter(
                    (product: any) => product.id !== productId,
                  ),
                ),
              }
            : order,
        ),
      };
    }

    case ASS_STATUS_ORDER_LIST_DATA: {
      const {storeId, status} = action.payload;

      return {
        ...state,
        orderListData: state.orderListData.map((product: any) =>
          product?.storeData?.id === storeId
            ? {
                ...product,
                status: status,
              }
            : product,
        ),
      };
    }
    default:
      return state;
  }
}

function calculatePrice(products: any) {
  const subtotal = products.reduce(
    (acc: any, product: any) =>
      acc + (product.price ?? 0) * (product.quantity ?? 1),
    0,
  );
  const tax = (subtotal * 1) / 100;
  const total = subtotal + tax + 2;
  return {subtotal, tax, tip: '', total};
}
