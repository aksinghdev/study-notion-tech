import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../slices/cartSlice";
import { FaStar } from "react-icons/fa"
import ReactStars from "react-rating-stars-component";

export default function CartItem(){

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return(
        <>
            {
                !cart ? (
                    <div>
                        Cart is empty
                    </div>
                ):cart.map( (course, index) =>(
                    <div key={index} className=" flex flex-col gap-2 items-start text-richblack-5">
                    <img
                        src={course.thumbnail}
                        className=" w-[100px] h-[100px] rounded-lg object-cover"
                    />
                    {/* cart text content */}
                    <div>
                        <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">4.5</span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richblack-400">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
                    </div>
                    {/* Remove item and price */}
                    <div >
                        <button 
                        onClick={()=> dispatch(removeFromCart(course._id))}
                        className=" flex flex-row gap-3 items-center justify-center">
                            <MdDelete/>
                            <div>
                                Remove
                            </div>
                        </button>
                        <p>
                           ₹ {course.price}
                        </p>
                    </div>

                </div>
                ))
            }
        
        </>
    );
}