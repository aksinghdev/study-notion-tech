
import { createSlice } from "@reduxjs/toolkit";

let token = null

try{
    const storedToken = localStorage.getItem("token");
    token = storedToken ? JSON.parse(storedToken) : null;
}
catch(error){
    console.error("failed to read token form local storage ", error);
    token= null;
}

const initialState = {
    signupData: null,
    loading: false,
    token: token,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload
        },
        setSignupData(state, value){
            state.signupData = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload;
        }
    },
});


export const {setToken, setLoading, setSignupData} = authSlice.actions;
export default authSlice.reducer;