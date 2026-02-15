import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

type Role = 'admin' | 'user';
interface RoleState{
    role: Role;
}

const initialState: RoleState = {
  role: 'user'
}

const userRole = createSlice({
    name: "userRole",
    initialState,
    reducers:{
        setRole: (state,action: PayloadAction<Role>)=>{
            state.role = action.payload;
        },
        toggleRole: (state)=>{
            if(state.role === 'admin') return {role:'user'};
        }
    }

})

export default userRole.reducer
export const {setRole,toggleRole} = userRole.actions;