import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {logOut} from '../../../services/operations/authAPI'

export default function LogOut({ConfirmationModal, setConfirmationModal}){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <button
            className=""
            onClick={ () => setConfirmationModal({
                text1: "Are You Sure ?",
                text2: "You will be Logged out",
                btn1text: "Logout",
                btn2text: "Cancel",
                btn1Handler: () => dispatch(logOut(navigate)) ,
                btn2Handler: () => setConfirmationModal(null) ,
            }) }
        >
            <div className=" flex flex-row gap-x-2">
                <VscSignOut/>
                <span>Logout</span>
            </div>
        </button>
    );
}