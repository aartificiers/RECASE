import { createSlice } from '@reduxjs/toolkit';



const userSlice = createSlice({
    name: 'user',
    initialState:{
        isAuthenticated:false,
        user:null
    },
    reducers: {
        addUser(state,action){
            return action.payload;
        },
        resetUser(state,action){
            return {}
        }

    }
})

export default userSlice.reducer;
export const { addUser,resetUser } = userSlice.actions;