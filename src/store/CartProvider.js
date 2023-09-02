import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updateAddCartItems = state.items.concat(action.item)
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount
        return {
            items: updateAddCartItems,
            totalAmount: updateTotalAmount
        }
    }
    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemsCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemsCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const cartContext =  {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItems: addItemsCartHandler,
        removeItems: removeItemsCartHandler,
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;