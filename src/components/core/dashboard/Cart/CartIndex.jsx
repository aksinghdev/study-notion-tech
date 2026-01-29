import { useSelector } from "react-redux";
import CartItem from "./CartItem"
import TotalCartPrice from "./TotalCartPrice";

export default function CartIndex(){

    const {totlaItems, total, cart} = useSelector( (state) => state.cart);
    

    return (
        <div className=" text-richblack-5">
            <h2>My Cart</h2>
            {/* if cart data present */}
            <p>
                {`${totlaItems} Courses in Your Cart`}
            </p>
            {
                totlaItems > 0 ? (
                    <div>
                        <CartItem/>
                        <TotalCartPrice/>
                    </div>
                ): 
                (
                    <div className=" text-white">
                        Your Cart Is empty
                    </div>
                )
            }
        </div>
    );
}