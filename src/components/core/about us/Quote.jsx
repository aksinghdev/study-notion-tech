
import HilightText from "../../common/HighlightText";

const Quote = () =>{
    return(
        <div className="text-richblack-100   text-center font-inter font-[600] text-3xl py-24 px-5 w-[75%]">
            <span className=" text-richblack-600 text-6xl p-0 m-0">
                
                “</span>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <span className="">
                {" "}
                <HilightText text={"combines technology"}/>
            </span>
            
            <HilightText text={"experties"} color={"text-transparent bg-brown-200 bg-clip-text"}/>  
            , and community to create an 
            <span>{" "}
            <HilightText text={"unparalleled educational experience."} color={"text-transparent bg-browngradient bg-clip-text"}/>  
            </span>
            
{/* #E65C00 */}
            <sup className=" text-center text-richblack-600 text-6xl ">„</sup>
        </div>
    );
}

export default Quote;