import {createContext, useReducer} from 'react';


//Context
export const CombosContext = createContext();

//Actions. 
const SET_DATA= 'setData';
const SET_CATEGORIES = 'setCategories';
const SET_GLASSES = 'setGlasses';
const SET_INGREDIENTS = 'setIngredients';
const SET_ALCOHOLIC = 'setAlcoholic';


//defaults
const defaultombosContext = {
    categories:[],
    glasses:[],
    ingredients:[],
    alcoholic:[]
}

//reducer
const reducerCombos = (state, action) =>{
    switch(action.type){
        case SET_DATA:
            let {categories =[], glasses =[], ingredients =[], alcoholic=[]} = action.payload ? action.payload : {}
            return {...state, categories, glasses, ingredients, alcoholic }
        case SET_CATEGORIES:
            return {...state, categories: action.payload};
        case SET_GLASSES:
            return {...state, glasses: action.payload};
        case SET_INGREDIENTS:
            return {...state, ingredients: action.payload};
        case SET_ALCOHOLIC:
            return {...state, alcoholic: action.payload};
        default:
            return state;
    }
}

//provider
const CombosProvider = ({children, ...props})=>{
    const [state, dispatch] = useReducer(reducerCombos,defaultombosContext);
    //action creators
    const setCategories = (categories) =>{
        dispatch({type: SET_CATEGORIES, payload: categories})
    }
    const setGlasses = (glasses) =>{
        dispatch({type: SET_GLASSES, payload: glasses})
    }
    const setIngredients = (ingredients)=>{
        dispatch({type: SET_INGREDIENTS, payload: ingredients})
    }
    const setAlcoholic = (alcoholic)=>{
        dispatch({type: SET_ALCOHOLIC, payload: alcoholic})
    }

    return <CombosContext.Provider 
      value={[state,{SET_CATEGORIES, SET_GLASSES, SET_INGREDIENTS, SET_ALCOHOLIC }, 
      {setCategories,setGlasses, setIngredients, setAlcoholic }, 
      dispatch]}
    >
        {children}
    </CombosContext.Provider>
}

export default CombosProvider;