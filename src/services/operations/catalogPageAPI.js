

import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../api";

export const getCatalogPageData = async (categoryId) =>{
    const toastId = toast.loading("Loading....")
    let result = [] 
    try{
        const responce = await apiConnector(
            "POST",
            catalogData.CATALOGPAGEDATA_API,
            {
                categoryId : categoryId
            }
        )
        if(!responce?.data?.success){
            throw new Error("Couldn't fetch catalog page data ...")
        }
        result = responce?.data;
    }
    catch(error){
        console.log("Catalog page data API error ......", error);
        toast.error(error.message);
        result = error.responce?.data
    }
    toast.dismiss(toastId)
    return result
}