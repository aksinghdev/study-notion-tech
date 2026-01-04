
import { useEffect } from "react";


export default function UseOnClickOutside(ref, handler){
    useEffect( ()=>{
        // defines listener function that will be called when touch/click events
        const listener = (event)=>{
            // if click inside, do nothing
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            // if click outside, call handler
            handler(event);
        };
            // add event listener for mousedown or touchstart event on the document
            document.addEventListener("mousedown",listener);
            document.addEventListener("touchstart",listener);

            // cleanup function for remove the eventListener when change the handler function dependencies or ref

            return () => {
                document.removeEventListener("mousedown",listener);
                document.removeEventListener("touchstart",listener); 
            }
        
    },[ref, handler]);
}