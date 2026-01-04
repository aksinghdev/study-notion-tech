import React from "react";

function HilightText ({text, color}){
    return(
        <span className={`${color ? (color) :"text-transparent bg-bluegradient bg-clip-text"}`}>
            {" "}{text}
        </span>
    );
}

export default HilightText;