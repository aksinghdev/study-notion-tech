import { useSelector } from "react-redux";
import BtnIcon from "../../../common/BtnIcon"

export default function TotalCartPrice(){

    const {total} = useSelector( (state) => state.cart);

    return(
        <div>
            <p>Total :</p>
            <p>{`RS. ${total}`}</p>
            <p></p>
            <BtnIcon
                text="Buy Now"
            />
        </div>
    );
}