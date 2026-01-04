
import react from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/dashboard/Sidebar";

export default function Dashboard(){

    const {loading: authLoading} = useSelector( (state) => state.auth);
    const {loading: profileLoading} = useSelector( (state) => state.profile);

    if(authLoading || profileLoading){
        return(
            <div className=" mt-24">
                Loading...
            </div>
        );
    }


    return(
        <div className=" relative flex flex-row min-h-[cal(100vh-3.5rem)]">
            <Sidebar/>
            <div className=" h-[cal(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] px-10 py-12 ">
                <Outlet/>

                </div>

            </div>
        </div>
    );

}