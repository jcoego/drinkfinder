import {createContext, useEffect, useReducer} from 'react';

import axios from 'axios';
import { getUrl } from '../../utils/config';
import { handleErrors } from '../../utils/errors';


//Context
export const CombosContext = createContext();

//Actions. 
const SET_COMBOS= 'setCombos';
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
        case SET_COMBOS:
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
    const setCombos = (allCombos)=>{
      dispatch({type: SET_COMBOS, payload: allCombos})
    }
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

    //business logic functions
    const getCombos = async ()=>{
      try{

        let categories = await axios.get(`${getUrl()}/list.php?c=list`);
        let glasses = await axios.get(`${getUrl()}/list.php?g=list`);
        let ingredients = await axios.get(`${getUrl()}/list.php?i=list`);
        let alcoholic = await axios.get(`${getUrl()}/list.php?a=list`);
      
        categories = (!categories || !categories.data || !categories.data.drinks) ? [] : categories.data.drinks.map(cat => cat.strCategory)
        glasses = (!glasses || !glasses.data || !glasses.data.drinks) ? [] : glasses.data.drinks.map(glass => glass.strGlass)
        ingredients = (!ingredients || !ingredients.data || !ingredients.data.drinks) ? [] : ingredients.data.drinks.map(ing => ing.strIngredient1)
        alcoholic = (!alcoholic || !alcoholic.data || !alcoholic.data.drinks) ? [] : alcoholic.data.drinks.map(alc => alc.strAlcoholic)

        setCombos({categories, glasses, ingredients, alcoholic});
      }catch(err){
        throw err;
      }
    }

    //initialize combos
    useEffect(()=>{
        getCombos()
          .then(()=>{})
          .catch(err => {
            handleErrors(err);
          });

    },[])

    return <CombosContext.Provider 
      value={[state,{SET_CATEGORIES, SET_GLASSES, SET_INGREDIENTS, SET_ALCOHOLIC }, 
      {setCombos, setCategories,setGlasses, setIngredients, setAlcoholic }, 
      dispatch]}
    >
        {children}
    </CombosContext.Provider>
}

export default CombosProvider;