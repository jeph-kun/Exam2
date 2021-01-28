export default (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      const temp = state.cart.filter((item) => item.id === action.payload.id);
      const restArray = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      if (temp[0] != null) {
        temp[0].qty++;
        return {
          ...state,
          cart: [temp[0], ...restArray],
        };
      } else {
        return {
          ...state,
          cart: [action.payload, ...state.cart],
        };
      }

    case "ADD_PRODUCT":
      return {
        ...state,
        items: [action.payload, ...state.items],
      };

    case "EDIT_PRODUCT":
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        items: [action.payload, ...state.items],
      };

    case "DELETE_PRODUCT":
      state.items = state.items.filter(
        (item) => item.id !== action.payload.item_id
      );

    case "DELETE_CART":
      const restArrayCart = state.cart.filter(
        (item) => item.id !== action.payload
      );
      let something,
        flag = 0;
      state.cart.forEach((item) => {
        if (item.id === action.payload && item.qty !== 1) {
          let updatedItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            desc: item.desc,
            qty: item.qty - 1,
          };
          something = [updatedItem, ...restArrayCart];
          flag = 1;
        }
      });
      if (flag) {
        return {
          ...state,
          cart: something,
        };
      } else {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };
      }
    default:
      return state;
  }
};
