import * as actionTypes from './actions' 

const initialState = {
    token:"",
    user:"Yash Gupta"
};

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.INIT:
            return {...state,user:action.name};
        default: 
            return state;
    }
}

export default reducer;