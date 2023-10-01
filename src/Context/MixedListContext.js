import React, { createContext, useContext, useReducer } from 'react';

// Define your initial state here
const initialState = {
    // Add your global state properties here
    id: 0,
    meals: []
};

// Define your reducer function to update the global state
const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LIST_ID':
            return { ...state, id: action.payload };
        case 'ADD_MEAL':
            return addMeal(state, action);
        case 'REMOVE_MEAL':
            return removeMeal(state, action);
        case 'SET_MEALS': 
            return { ...state, meals: action.payload };
        case 'CLEAN': 
            return { ...state, meals: [] };
        default:
            return state;
    }
};

const removeMeal = (state, action) => {
    const meals = state.meals;
    const filtered = meals.filter(x => x.id !== action.payload.id);
    console.log('addMeal', filtered)

    return { ...state, meals: filtered }
}

const addMeal = (state, action) => {
    const meals = state.meals;
    meals.push(action.payload);

    console.log('addMeal', meals)

    return { ...state, meals: meals }
}


const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useMixedListContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useMixedListContext must be used within an AppProvider');
    }
    return context;
};
