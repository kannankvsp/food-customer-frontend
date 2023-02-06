import { createSlice } from '@reduxjs/toolkit'

const cart = createSlice(
    {
        name: "addToCart",
        initialState: {
            value: [],
            totalPlateCost:0
        },
        reducers: {
            cartState: (state, action) => {
                if (state.value.every((item)=>item.id!=action.payload.id)) {
                    state.value = [...state.value, action.payload]
                }

            },
            deleteState: (state,action) => {
                state.value = [...state.value.filter((item)=>item.id!=action.payload[0])]
                let temp =0;
                state.value.map((item)=>temp=temp+item.cost)
                state.totalPlateCost=temp*action.payload[1]
            },
            totalPlateCostState:(state, action)=>{
                let temp =0;
                state.value.map((item)=>temp=temp+item.cost)
                state.totalPlateCost=temp*action.payload
            }
        }
    }
)

export default cart.reducer; // export the state
export const { cartState, deleteState, totalPlateCostState } = cart.actions; // to export the action ( login )