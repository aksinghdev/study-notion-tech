
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:{
        // settotalItems(state,value){
        //     state.totalItems = value.payload;
        // },
        // add to cart
        addToCart(state, action){
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course.id)
            // when course is already in the cart
            if(index >= 0){
                toast.error("Course already in cart");
                return
            }
            // when course not in the cart , then add it
            state.cart.push(course);
            // update total quantity and price
            state.totalItems++
            state.total += course.price 

            // update local storage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

            // show the success toast
            toast.success("Course added to the cart");

        },

        // remove from cart
        removeFromCart(state, action){
            const courseId = action.payload;
            const index = state.cart.findIndex( (item) => item._id === courseId );

            if(index >= 0){
                // course is present in the cart, then remove it
                state.totalItems--
                state.total -= state.cart[index].price
                // remove item
                state.cart.splice(index,1);

                // update local storage
               localStorage.setItem("cart", JSON.stringify(state.cart)) 
               localStorage.setItem("total", JSON.stringify(state.total)) 
               localStorage.setItem("totalItems", JSON.stringify(state.totalItems)) 

            //    show success toast
                toast.success("Course removed from cart")
            }

        },
        // reset cart
        resetCart(state){
            state.cart = []
            state.total = 0
            state.totalItems = 0
            //  update localStorage 
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
            // show toast 
            toast.success("Your cart successfully reset");
        }
    },
});


export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;