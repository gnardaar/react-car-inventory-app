import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        make: 'Make',
        model: 'Model',
        condition: 'Condition',
        year: 'Year',
    },
    reducers: {
        chooseMake: (state, action) => { state.make = action.payload},
        chooseModel: (state, action) => { state.model = action.payload},
        chooseCondition: (state, action) => { state.condition = action.payload},
        chooseYear: (state, action) => { state.year = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseMake, chooseModel, chooseCondition, chooseYear } = rootSlice.actions;

// A reducer is like an event listener that handles the events based on the kind of event it receives