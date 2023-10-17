import {createSlice, current} from '@reduxjs/toolkit'

const LoginSlice = createSlice({
    name:"Login",
    initialState:{
        current:null,
        error:false
    },
    reducers:{
        LoginStart:(state)=>{
            state.current = null
            state.error = false
        },
        LoginSuccess:(state,action)=>{
            state.current = action.payload,
            state.error = false
        },
        LoginFailure:(state)=>{
            state.current = null,
            state.error = true
        },
        Logout:(state)=>{
            state.current = null,
            state.error - false
        }
    }
})
export const {LoginStart,LoginSuccess,LoginFailure,Logout} = LoginSlice.actions
export default LoginSlice.reducer