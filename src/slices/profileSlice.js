

import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () =>{
    try{
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
    catch(error){
        console.error("Get error during user parsing from local Storage",error);
        return null;
    }
}


const initialState = {
    user: getInitialUser(),
    loading: false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload;
        }
    },
});


export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;
